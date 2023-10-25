package com.example.A201.battery.service;

import com.example.A201.battery.vo.BatteryCodeResponse;
import com.example.A201.battery.vo.BatterydataResponse;

import java.util.List;

public interface BatteryService {
    List<BatteryCodeResponse> getBatteries();

    BatterydataResponse getBattery(String code);
}
