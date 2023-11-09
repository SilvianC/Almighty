package com.batteryalmighty.bms.service;

import com.batteryalmighty.bms.domain.mysql.BmsBoard;
import com.batteryalmighty.bms.repository.mongo.VitBoardRepository;
import com.batteryalmighty.bms.repository.mysql.BmsBoardRepository;
import com.batteryalmighty.bms.vo.VitResponse;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class BmsService {

    private final VitBoardRepository vitBoardRepository;
    private final BmsBoardRepository bmsBoardRepository;

    public List<String[]> uploadCsv(@RequestPart(value = "file", required = true) MultipartFile file) {

        if (file.isEmpty()) {
            throw new IllegalStateException("업로드할 csv 파일이 존재하지 않습니다.");
        }

        List<String[]> records;

        try (InputStreamReader csvFile = new InputStreamReader(file.getInputStream(), "UTF-8");
             CSVReader csvReader = new CSVReader(csvFile)) {

            records = new ArrayList<>();
            String[] values;

            while ((values = csvReader.readNext()) != null) {
                records.add(values);
                for (String value : values) {
                    log.info(value);
                }
            }
        } catch (IOException e) {
            throw new RuntimeException("파일 읽기 중 에러가 발생했습니다.");
        } catch (CsvException e) {
            throw new RuntimeException("CSV 파싱 중 에러가 발생했습니다.");
        }

        return records;
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
