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
public class TestdataServiceImpl implements TestdataService {
    private final TestdataRepository testdataRepository;

    @Override
    public List<TestdataResponse> readTestdataList(String batteryId, Long testId){
        List<Testdata> dataList = testdataRepository.findByBatteryAndTestId(batteryId, testId);
        List<TestdataResponse> responses = new ArrayList<>();
        for (Testdata testdata : dataList) {
            responses.add(TestdataResponse.testdataResponse(testdata));
        }
        return responses;
    }
}
