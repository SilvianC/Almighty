package com.example.A201.battery.service;

import com.example.A201.battery.vo.BatteryResponse;
import com.example.A201.battery.vo.BatterydataResponse;

import java.util.List;

public interface BatteryService {
    List<BatteryResponse> getBatteriesAll();

    BatterydataResponse getBattery(String code);

    List<BatteryResponse> getBatteries(Long memberId);
}
