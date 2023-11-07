package com.batteryalmighty.bms.service;

import com.batteryalmighty.bms.domain.mongo.VitBoard;
import com.batteryalmighty.bms.domain.mysql.BmsBoard;
import com.batteryalmighty.bms.repository.mongo.VitBoardRepository;
import com.batteryalmighty.bms.repository.mysql.BmsBoardRepository;
import com.batteryalmighty.bms.vo.VitResponse;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.NotFound;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Slf4j
class BmsServiceTest {

    VitBoardRepository vitBoardRepository;
    BmsBoardRepository bmsBoardRepository;

    BmsService bmsService;

    @Test
    void getVitBoardList() {
       bmsBoardRepository.findById(1L).orElseThrow(() -> new IllegalStateException("아니 왜"));



//        List<VitBoard> boardall = vitBoardRepository.findAll();
//
//        for (VitBoard vitBoard : boardall) {
//            log.info(String.valueOf(vitBoard.getId()));
//        }

//        List<VitResponse> vitBoardList = bmsService.getVitBoardList();
//
//        int size = 0;
//        for (VitResponse vitResponse : vitBoardList) {
//            if (size > 10) {
//                break;
//            }
//            log.info(String.valueOf(vitResponse.getVoltage()));
//            size++;
//        }
    }
}