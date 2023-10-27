package com.example.A201.battery.service;

import com.example.A201.battery.constant.Status;
import com.example.A201.battery.domain.Battery;
import com.example.A201.battery.vo.BatteryResponse;
import com.example.A201.battery.vo.BatterydataResponse;

import java.util.List;

public interface BatteryService {
    List<BatteryResponse> getBatteriesAll();

    BatterydataResponse getBattery(String code);

    Battery updateBatteryStatue(Long batteryId, Status status);

    List<BatteryResponse> getBatteries(Long memberId);

    List<BatteryResponse> getRequestBatteries();

    void updateBatteriesStatus(List<String> list);
}
