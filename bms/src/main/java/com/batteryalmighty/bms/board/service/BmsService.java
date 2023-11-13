package com.batteryalmighty.bms.board.service;

import com.batteryalmighty.bms.battery.domain.Battery;
import com.batteryalmighty.bms.battery.domain.Model;
import com.batteryalmighty.bms.battery.mysql.BatteryRepository;
import com.batteryalmighty.bms.battery.mysql.ModelRepository;
import com.batteryalmighty.bms.vitboard.domain.VitBoard;
import com.batteryalmighty.bms.board.domain.BmsBoard;
import com.batteryalmighty.bms.vitboard.mongo.VitBoardRepository;
import com.batteryalmighty.bms.board.mysql.BmsBoardRepository;
import com.batteryalmighty.bms.vitboard.vo.VitResponse;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class BmsService {
    private final BatteryRepository batteryRepository;
    private final ModelRepository modelRepository;
    private final VitBoardRepository vitBoardRepository;
    private final BmsBoardRepository bmsBoardRepository;
    private final MongoTemplate mongoTemplate;

    private final Ekf ekf;

    public void uploadCsv(@RequestPart(value = "file", required = true) MultipartFile file) {

        if (file.isEmpty()) {
            throw new IllegalStateException("업로드할 csv 파일이 존재하지 않습니다.");
        }

        List<String[]> records;

        int num = 0;
        try (InputStreamReader csvFile = new InputStreamReader(file.getInputStream(), "UTF-8");
             CSVReader csvReader = new CSVReader(csvFile)) {

            csvReader.readNext();
            String[] values;

            while ((values = csvReader.readNext()) != null) {

                log.info(String.valueOf(num++));

                VitBoard vitBoard = VitBoard.builder()
                        .voltage(Double.valueOf(values[0]))
                        .current(Double.valueOf(values[1]))
                        .temperature(Double.valueOf(values[2]))
                        .time(Double.valueOf(values[3]))
                        .soc(0.0)
//                        .ekf(0.0)
                        .progressId(7L)
                        .build();

                vitBoardRepository.save(vitBoard);

            }
        } catch (IOException e) {
            throw new RuntimeException("파일 읽기 중 에러가 발생했습니다.");
        } catch (CsvException e) {
            throw new RuntimeException("CSV 파싱 중 에러가 발생했습니다.");
        }

    }

    public void socPredict(){
        List<VitBoard> vitBoards = vitBoardRepository.findVitBoardByProgressId(7L);
        Battery battery = batteryRepository.findById(1L)
                .orElseThrow(() -> new IllegalStateException("찾는 배터리가 없습니다."));
        Model model = modelRepository.findById(battery.getId())
                .orElseThrow(() -> new IllegalStateException("찾는 배터리 모델이 없습니다."));

        ekf.init();
//        double overVolt = 4.213;
//        double underVolt = 2.4707;
//        double overCurrent = 1.495;
//        double overTemperatureCharge = 50;
//        double overTemperatureDischarge = 60;
//        double underTemperatureCharge = 0;
//        double underTemperatureDischarge = -10;
        int overVoltageCount = 0;
        int underVoltageCount = 0;
        int overCurrentCount = 0;
        int underTemperatureCount = 0;
        int overTemperatureCount = 0;
        double prevCurrent = 0;
        double prevVolt = 0;
        double prevTemperature = 10;
        for (VitBoard vitBoard : vitBoards) {
            ekf.predictx_(vitBoard);
            ekf.predictP();
            ekf.kalmanGain(vitBoard.getCurrent(), vitBoard.getVoltage());
            ekf.predictx(vitBoard.getVoltage());
            ekf.nextP();

            // ekf 업데이트
            // vitBoard.predictEkf(ekf.get());

            Query findVit = new Query(Criteria.where("_id").is(vitBoard.getId()));
            Update updateEkf = new Update();
            updateEkf.set("Soc", ekf.get());
            mongoTemplate.updateFirst(findVit, updateEkf, VitBoard.class);

            if(prevVolt < model.getOverVoltageThreshold() && vitBoard.getVoltage() >= model.getOverVoltageThreshold()) overVoltageCount++;
            if(prevVolt > model.getUnderVoltageThreshold() && vitBoard.getVoltage() <= model.getUnderVoltageThreshold()) underVoltageCount++;

            // 충전 상태 (양전류)
            if(vitBoard.getCurrent() > 0){
                if(prevCurrent < model.getOverCurrentChargeThreshold() && vitBoard.getCurrent() >= model.getOverCurrentChargeThreshold()) overCurrentCount++;
//                if(prevTemperature < model.getMinTemperatureChargeThreshold() && vitBoard.getTemperature() >= model.getMinTemperatureChargeThreshold()) underTemperatureCount++;
//                if(prevTemperature < model.getMaxTemperatureChargeThreshold() && vitBoard.getTemperature() >= model.getMaxTemperatureChargeThreshold()) overTemperatureCount++;
            }

            // 방전 상태 (음전류)
            if(vitBoard.getCurrent() <= 0){
                if(prevCurrent < model.getOverCurrentDischargeThreshold() && vitBoard.getCurrent() >= model.getOverCurrentDischargeThreshold()) overCurrentCount++;
//                if(prevTemperature < model.getMinTemperatureDischargeThreshold() && vitBoard.getTemperature() >= model.getMinTemperatureDischargeThreshold()) underTemperatureCount++;
//                if(prevTemperature < model.getMaxTemperatureDischargeThreshold() && vitBoard.getTemperature() >= model.getMaxTemperatureDischargeThreshold()) overTemperatureCount++;
            }

            // 전에 값 갱신
            prevVolt = vitBoard.getVoltage();
            prevCurrent = vitBoard.getCurrent();
//            prevTemperature = vitBoard.getTemperature();
        }

        BmsBoard bmsBoard = BmsBoard.builder()
                .progressId(7L)
                .overVoltageCount(overVoltageCount)
                .underVoltageCount(underVoltageCount)
                .overCurrentCount(overCurrentCount)
                .underTemperatureCount(underTemperatureCount)
                .overTemperatureCount(overTemperatureCount)
                .build();

        bmsBoardRepository.save(bmsBoard);

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
