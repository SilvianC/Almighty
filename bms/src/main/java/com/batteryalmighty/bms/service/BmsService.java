package com.batteryalmighty.bms.service;

import com.batteryalmighty.bms.BmsApplication;
import com.batteryalmighty.bms.domain.mysql.BmsBoard;
import com.batteryalmighty.bms.repository.mongo.VitBoardRepository;
import com.batteryalmighty.bms.repository.mysql.BmsBoardRepository;
import com.batteryalmighty.bms.vo.VitResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BmsService {

    private final VitBoardRepository vitBoardRepository;
    private final BmsBoardRepository bmsBoardRepository;

//    public void uploadcsv(MultipartFile file){
//
//        if (file.isEmpty()) {
//            throw new IllegalStateException("업로드할 csv 파일이 존재하지 않습니다.");
//        }
//
//        try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(file.getInputStream(), "UTF-8"));
//             CSVReader csvReader = new CSVReader(fileReader)) {
//
//            List<String[]> records = csvReader.readAll();
//            for (String[] record : records) {
//                // 여기서 각 record는 CSV 파일의 한 줄을 나타내며, 각 컬럼에 접근할 수 있습니다.
//                String columnOne = record[0]; // 첫 번째 컬럼
//                String columnTwo = record[1]; // 두 번째 컬럼
//                // 추가적인 처리...
//            }
//
//            return new ResponseEntity<>("CSV 파일이 성공적으로 처리되었습니다.", HttpStatus.OK);
//        } catch (IOException e) {
//            throw new RuntimeException("파일 읽기 중 에러가 발생했습니다.");
//        } catch (CsvException e) {
//            throw new RuntimeException("CSV 파싱 중 에러가 발생했습니다.");
//        }
//    }

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
