package com.batteryalmighty.bms.board.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.batteryalmighty.bms.battery.domain.Model;
import com.batteryalmighty.bms.progress.domain.Progress;
import com.batteryalmighty.bms.progress.dto.ProgressIdDTO;
import com.batteryalmighty.bms.progress.mysql.ProgressRepository;
import com.batteryalmighty.bms.vitboard.domain.VitBoard;
import com.batteryalmighty.bms.board.domain.BmsBoard;
import com.batteryalmighty.bms.vitboard.mongo.VitBoardRepository;
import com.batteryalmighty.bms.board.mysql.BmsBoardRepository;
import com.batteryalmighty.bms.vitboard.vo.VitResponse;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class BmsService {
    private final VitBoardRepository vitBoardRepository;
    private final BmsBoardRepository bmsBoardRepository;
    private final ProgressRepository progressRepository;

    private final Ekf ekf;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3 amazonS3Client;

    public void uploadBoard(ProgressIdDTO progressIdDTO) {
        log.info(progressIdDTO.getCode());
        log.info(String.valueOf(progressIdDTO.getProgressId()));

        String filePath = "battery/";
        String filename = filePath + progressIdDTO.getCode() + ".csv";

        try {
            S3Object s3object = amazonS3Client.getObject(bucket, filename);
            try (S3ObjectInputStream inputStream = s3object.getObjectContent();
                 CSVReader csvReader = new CSVReader(new InputStreamReader(inputStream))) {
                socPredict(progressIdDTO.getProgressId(), csvReader);
            }
        } catch (IOException | CsvException e) {
            // 예외 처리
            throw new RuntimeException("CSV 파일 읽기 실패", e);
        }

//        int num = 0;
//        try (InputStreamReader csvFile = new InputStreamReader(file.getInputStream(), "UTF-8");
//             CSVReader csvReader = new CSVReader(csvFile)) {
//
//            csvReader.readNext();
//            String[] values;
//
//            while ((values = csvReader.readNext()) != null) {
//
//                log.info(String.valueOf(num++));
//
//                VitBoard vitBoard = VitBoard.builder()
//                        .voltage(Double.valueOf(values[0]))
//                        .current(Double.valueOf(values[1]))
//                        .temperature(Double.valueOf(values[2]))
//                        .time(Double.valueOf(values[3]))
//                        .soc(0.0)
////                        .ekf(0.0)
//                        .progressId(7L)
//                        .build();
//
//                vitBoardRepository.save(vitBoard);
//
//            }
//        } catch (IOException e) {
//            throw new RuntimeException("파일 읽기 중 에러가 발생했습니다.");
//        } catch (CsvException e) {
//            throw new RuntimeException("CSV 파싱 중 에러가 발생했습니다.");
//        }

    }

    public void socPredict(Long progressId, CSVReader csvReader) throws CsvException, IOException {

        Progress progress = progressRepository.findById(progressId)
                .orElseThrow(() -> new IllegalStateException("찾는 프로세스 요청이 없습니다."));

        Model model = progress.getBattery().getModel();

        int overVoltageCount = 0;
        int underVoltageCount = 0;
        int overCurrentCount = 0;
        int underTemperatureCount = 0;
        int overTemperatureCount = 0;
        double prevCurrent = 0;
        double prevVolt = 0;
        double prevTemperature = 0;

        double maxVoltageCharge = Double.MIN_VALUE;
        double minVoltageCharge = Double.MAX_VALUE;
        double maxVoltageDischarge = Double.MIN_VALUE;
        double minVoltageDischarge = Double.MAX_VALUE;
        double maxTemperatureCharge = Double.MIN_VALUE;
        double minTemperatureCharge = Double.MAX_VALUE;
        double maxTemperatureDischarge = Double.MIN_VALUE;
        double minTemperatureDischarge = Double.MAX_VALUE;


        csvReader.readNext();
        String[] values;
        Boolean plusCurrent = false;
        int turn = 0;

        while ((values = csvReader.readNext()) != null){

            Double voltage = Double.valueOf(values[0]);
            Double current = Double.valueOf(values[1]);
            Double temperature = Double.valueOf(values[2]);
            Double time = Double.valueOf(values[3]);

            if(turn == 0){
                if(current > 0)
                    plusCurrent = true;
                ekf.init(plusCurrent);
//                turn += 1;
            }

            ekf.predictx_(time, current);
            ekf.predictP();
            ekf.kalmanGain(current, voltage);
            ekf.predictx(voltage);
            ekf.nextP();

//            log.info(String.valueOf(turn++));

            VitBoard vitBoard = VitBoard.builder()
                    .voltage(voltage)
                    .current(current)
                    .temperature(temperature)
                    .time(time)
                    .soc(ekf.get())
                    .progressId(progressId)
                    .build();

            vitBoardRepository.save(vitBoard);

            // count 체크
            if(prevVolt < model.getOverVoltageThreshold() && voltage >= model.getOverVoltageThreshold()) overVoltageCount++;
            if(prevVolt > model.getUnderVoltageThreshold() && voltage <= model.getUnderVoltageThreshold()) underVoltageCount++;


            // 충전 상태 (양전류)
            if(current > 0){
                // count 체크
                if(prevCurrent < model.getOverCurrentChargeThreshold() && current >= model.getOverCurrentChargeThreshold()) overCurrentCount++;
                if(prevTemperature < model.getMinTemperatureChargeThreshold() && temperature >= model.getMinTemperatureChargeThreshold()) underTemperatureCount++;
                if(prevTemperature < model.getMaxTemperatureChargeThreshold() && temperature >= model.getMaxTemperatureChargeThreshold()) overTemperatureCount++;

                // 최대, 최소 전압
                if(voltage > maxVoltageCharge) maxVoltageCharge = voltage;
                if(voltage < minVoltageCharge) minVoltageCharge = voltage;

                // 최대, 최소 온도
                if(temperature > maxTemperatureCharge) maxTemperatureCharge = temperature;
                if(temperature < minTemperatureCharge) minTemperatureCharge = temperature;
            }

            // 방전 상태 (음전류)
            if(current <= 0){
                // count 체크
                if(prevCurrent < model.getOverCurrentDischargeThreshold() && current >= model.getOverCurrentDischargeThreshold()) overCurrentCount++;
                if(prevTemperature < model.getMinTemperatureDischargeThreshold() && temperature >= model.getMinTemperatureDischargeThreshold()) underTemperatureCount++;
                if(prevTemperature < model.getMaxTemperatureDischargeThreshold() && temperature >= model.getMaxTemperatureDischargeThreshold()) overTemperatureCount++;

                // 최대, 최소 전압
                if(voltage > maxVoltageDischarge) maxVoltageDischarge = voltage;
                if(voltage < minVoltageDischarge) minVoltageDischarge = voltage;

                // 최대, 최소 온도
                if(temperature > maxTemperatureDischarge) maxTemperatureDischarge = temperature;
                if(temperature < minTemperatureDischarge) minTemperatureDischarge = temperature;
            }

            // 전에 값 갱신
            prevVolt = voltage;
            prevCurrent = current;
            prevTemperature = temperature;

        }

        BmsBoard bmsBoard = BmsBoard.builder()
                .progress(progress)
                .overVoltageCount(overVoltageCount)
                .underVoltageCount(underVoltageCount)
                .overCurrentCount(overCurrentCount)
                .underTemperatureCount(underTemperatureCount)
                .overTemperatureCount(overTemperatureCount)
                .maxVoltageCharge(maxVoltageCharge)
                .minVoltageCharge(minVoltageCharge)
                .maxVoltageDischarge(maxVoltageDischarge)
                .minVoltageDischarge(minVoltageDischarge)
                .maxTemperatureCharge(maxTemperatureCharge)
                .minTemperatureCharge(minTemperatureCharge)
                .maxTemperatureDischarge(maxTemperatureDischarge)
                .minTemperatureDischarge(minTemperatureDischarge)
//                .receiveDate(LocalDateTime.now())
                .build();

        bmsBoardRepository.save(bmsBoard);

//        List<VitBoard> vitBoards = vitBoardRepository.findVitBoardByProgressId(7L);
//        Battery battery = batteryRepository.findById(1L)
//                .orElseThrow(() -> new IllegalStateException("찾는 배터리가 없습니다."));
//        Model model = modelRepository.findById(battery.getId())
//                .orElseThrow(() -> new IllegalStateException("찾는 배터리 모델이 없습니다."));
//
//
//        for (VitBoard vitBoard : vitBoards) {
//
//
//            // ekf 업데이트
//            // vitBoard.predictEkf(ekf.get());
//
//            Query findVit = new Query(Criteria.where("_id").is(vitBoard.getId()));
//            Update updateEkf = new Update();
//            updateEkf.set("Soc", ekf.get());
//            mongoTemplate.updateFirst(findVit, updateEkf, VitBoard.class);
//
//            if(prevVolt < model.getOverVoltageThreshold() && voltage >= model.getOverVoltageThreshold()) overVoltageCount++;
//            if(prevVolt > model.getUnderVoltageThreshold() && voltage <= model.getUnderVoltageThreshold()) underVoltageCount++;
//
//            // 충전 상태 (양전류)
//            if(current > 0){
//                if(prevCurrent < model.getOverCurrentChargeThreshold() && current >= model.getOverCurrentChargeThreshold()) overCurrentCount++;
//                if(prevTemperature < model.getMinTemperatureChargeThreshold() && temperature >= model.getMinTemperatureChargeThreshold()) underTemperatureCount++;
//                if(prevTemperature < model.getMaxTemperatureChargeThreshold() && temperature >= model.getMaxTemperatureChargeThreshold()) overTemperatureCount++;
//            }
//
//            // 방전 상태 (음전류)
//            if(current <= 0){
//                if(prevCurrent < model.getOverCurrentDischargeThreshold() && current >= model.getOverCurrentDischargeThreshold()) overCurrentCount++;
//                if(prevTemperature < model.getMinTemperatureDischargeThreshold() && temperature >= model.getMinTemperatureDischargeThreshold()) underTemperatureCount++;
//                if(prevTemperature < model.getMaxTemperatureDischargeThreshold() && temperature >= model.getMaxTemperatureDischargeThreshold()) overTemperatureCount++;
//            }
//
//            // 전에 값 갱신
//            prevVolt = voltage;
//            prevCurrent = current;
//            prevTemperature = temperature;
//        }
//
//        BmsBoard bmsBoard = BmsBoard.builder()
////                .progress(7L)
//                .overVoltageCount(overVoltageCount)
//                .underVoltageCount(underVoltageCount)
//                .overCurrentCount(overCurrentCount)
//                .underTemperatureCount(underTemperatureCount)
//                .overTemperatureCount(overTemperatureCount)
//                .build();

//        bmsBoardRepository.save(bmsBoard);

//        BmsBoard bmsBoard = bmsBoardRepository.findByProgressId(7L)
//                .orElseThrow(() -> new IllegalStateException("찾는 BMS가 없습니다."));
//        bmsBoard.setBmsCount(overVoltageCount, underVoltageCount, overCurrentCount);
    }

    public List<BmsBoard> getBms(){
        return bmsBoardRepository.findAll();
    }


    public List<VitResponse> getVitBoardList(){
        return vitBoardRepository.findAll()
                .stream()
                .filter(Objects::nonNull)
                .map(VitResponse::vitResponse)
                .collect(Collectors.toList());
    }

}
