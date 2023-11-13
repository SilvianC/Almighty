package com.example.A201.battery.service;

import com.example.A201.battery.dto.BatteryDTO;
import com.example.A201.battery.vo.BatteryResponse;
import com.example.A201.battery.vo.BatteryDataResponse;

import java.util.List;

public interface BatteryService {
    BatteryResponse registerBattery(BatteryDTO batteryDTO);

    List<BatteryResponse> getBatteriesAll();

    BatteryDataResponse getBattery(String code);

    Long getMemberId(Long batteryId);

    List<BatteryResponse> getBatteries(Long memberId);

//    Battery updateBatteryStatue(Long batteryId, BatteryStatus batteryStatus);

    List<BatteryResponse> getRequestBatteries();

}
