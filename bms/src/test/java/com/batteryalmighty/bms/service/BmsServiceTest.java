package com.batteryalmighty.bms.service;

import com.batteryalmighty.bms.board.service.BmsService;
import com.batteryalmighty.bms.vitboard.vo.VitResponse;
import lombok.extern.slf4j.Slf4j;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@AutoConfigureMockMvc
@SpringBootTest
@Rollback(value = false)
@Slf4j
class BmsServiceTest {

    @Autowired
    BmsService bmsService;


    @Test
    void getVitBoardList() {

        List<VitResponse> vitBoardList = bmsService.getVitBoardList();

        int size = 0;
        for (VitResponse vitResponse : vitBoardList) {
            if (size > 10) {
                break;
            }
            size++;
        }
    }

    @Test
    @Transactional
    void uploadCsv() {

        String filename = "B0025.csv";
        String filePath = "C:\\자율프로젝트\\S09P31S103\\data\\vits\\" + filename;

        // 존재 여부 확인
        assertTrue(Files.exists(Paths.get(filePath)));

        try{
            FileInputStream fis = new FileInputStream(filePath);
            MultipartFile tempFile = new MockMultipartFile("file", filename, "text/csv", fis);
//            MultipartFile tempFile = new MockMultipartFile("sample.csv", new FileInputStream(new File(filePath)));

            bmsService.uploadCsv(tempFile);
//            List<String[]> now = bmsService.uploadCsv(tempFile);
//            assertEquals(647, now.size()); // sample.csv

        } catch (Exception e) {
            e.printStackTrace();
            fail("CSV 파일을 읽는 중 예외가 발생했습니다.");
        }
    }

    @Transactional
    @Test
    void getEkf(){
        bmsService.socPredict();
    }

}