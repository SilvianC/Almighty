package com.example.A201.board.service;

import com.example.A201.board.vo.TestdataResponse;

import java.util.List;

public interface TestdataService {
    List<TestdataResponse> readTestdataList(String batteryId, Long testId);
}
