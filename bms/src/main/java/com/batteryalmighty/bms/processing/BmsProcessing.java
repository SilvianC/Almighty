package com.batteryalmighty.bms.processing;

import com.batteryalmighty.bms.domain.mongo.VitBoard;
import com.batteryalmighty.bms.repository.mongo.VitBoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class BmsProcessing {
    private final VitBoardRepository vitBoardRepository;
    private final Ekf ekf;
    public void predict(){
//        List<VitBoard> vitBoards = vitBoardRepository.findTop1000VitBoardByProgressIdOrderById(6L);
//        ekf.init();
//        int i = 0;
//        for (VitBoard vitBoard : vitBoards) {
//            if(i < 2){
//                i++;
//                continue;
//            }
//            ekf.predictx_(vitBoard.getVoltage());
//            ekf.predictP();
//            ekf.kalmanGain(vitBoard.getCurrent(), vitBoard.getVoltage());
//            ekf.predictx(vitBoard.getVoltage());
//            ekf.nextP();
//            vitBoard.predictEkf(ekf.get());
//        }
    }
}
