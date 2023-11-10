package com.batteryalmighty.bms.processing;

import com.batteryalmighty.bms.domain.BmsBoard;
import com.batteryalmighty.bms.domain.VitBoard;
import com.batteryalmighty.bms.repository.BmsBoardRepository;
import com.batteryalmighty.bms.repository.VitBoardRepository;
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
    private final BmsBoardRepository bmsBoardRepository;
    public void predict(){
        List<VitBoard> vitBoards = vitBoardRepository.findVitBoardByProgressIdOrderById(6L);
        ekf.init();
        double overVolt = 4.213;
        double underVolt = 2.4707;
        double overCurrent = 1.495;
        double overTemperatureCharge = 50;
        double overTemperatureDischarge = 60;
        double underTemperatureCharge = 0;
        double underTemperatureDischarge = -10;
        int overVoltageCount = 0;
        int underVoltageCount = 0;
        int overCurrentCount = 0;
        int abnormalTemperatureCount = 0;
        double prevCurrent = 0;
        double prevVolt = 0;
        double prevTemperature = 10;
        for (VitBoard vitBoard : vitBoards) {
            ekf.predictx_(vitBoard);
            ekf.predictP();
            ekf.kalmanGain(vitBoard.getCurrent(), vitBoard.getVoltage());
            ekf.predictx(vitBoard.getVoltage());
            ekf.nextP();
            vitBoard.predictEkf(ekf.get());
            if(prevVolt < overVolt && vitBoard.getVoltage() >= overVolt) overVoltageCount++;
            if(prevVolt > underVolt && vitBoard.getVoltage() <= underVolt) underVoltageCount++;
            if(prevCurrent < overCurrent && vitBoard.getCurrent() >= overCurrent) overCurrentCount++;
            if(vitBoard.getCurrent() > 0 && prevTemperature < overTemperatureCharge && vitBoard.getTemperature() >= overTemperatureCharge) abnormalTemperatureCount++;
            if(vitBoard.getCurrent() <= 0 && prevTemperature < overTemperatureDischarge && vitBoard.getTemperature() >= overTemperatureDischarge) abnormalTemperatureCount++;
            if(vitBoard.getCurrent() > 0 && prevTemperature > underTemperatureCharge && vitBoard.getTemperature() <= underTemperatureCharge) abnormalTemperatureCount++;
            if(vitBoard.getCurrent() <= 0 && prevTemperature > underTemperatureDischarge && vitBoard.getTemperature() <= underTemperatureDischarge) abnormalTemperatureCount++;
        }

        BmsBoard bmsBoard = BmsBoard.builder()
                .abnormalTemperatureCount(abnormalTemperatureCount)
                .overCurrentCount(overCurrentCount)
                .overVoltageCount(overVoltageCount)
                .underVoltageCount(underVoltageCount)
                .build();

        bmsBoardRepository.save(bmsBoard);
    }
}
