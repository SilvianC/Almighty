package com.example.A201.board.service;

import com.example.A201.board.domain.Testdata;
import com.example.A201.board.repository.TestdataRepository;
import com.example.A201.board.vo.TestdataResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class TestdataService {
    private final TestdataRepository testdataRepository;

    public List<TestdataResponse> readTestdataList(long uid){
        List<Testdata> dataList = testdataRepository.findByMetadataId(uid);
        List<TestdataResponse> responses = new ArrayList<>();
        for (Testdata testdata : dataList) {
            responses.add(TestdataResponse.builder()
                    .voltageMeasured(testdata.getVoltageMeasured())
                    .currentMeasured(testdata.getCurrentMeasured())
                    .temperatureMeasured(testdata.getTemperatureMeasured())
                    .currentLoad(testdata.getCurrentLoad())
                    .voltageLoad(testdata.getVoltageLoad())
                    .time(testdata.getTime())
                    .senseCurrent(testdata.getSenseCurrent())
                    .batteryCurrent(testdata.getBatteryCurrent())
                    .currentRatio(testdata.getCurrentRatio())
                    .batteryImpedance(testdata.getBatteryImpedance())
                    .rectifiedImpedance(testdata.getRectifiedImpedance())
                    .build());
        }
        return responses;
    }
}
