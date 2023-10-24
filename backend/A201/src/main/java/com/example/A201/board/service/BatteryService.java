package com.example.A201.board.service;

import com.example.A201.board.vo.BatteryCodeResponse;
import com.example.A201.board.vo.BatterydataResponse;

import java.util.List;

public interface BatteryService {
    List<BatteryCodeResponse> getBatteries();

    BatterydataResponse getBattery(String code);
}
