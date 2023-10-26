package com.example.A201.battery.service;

import com.example.A201.battery.constant.Status;
import com.example.A201.battery.domain.Battery;
import com.example.A201.battery.dto.BatteryDTO;
import com.example.A201.battery.vo.BatteryCodeResponse;
import com.example.A201.battery.vo.BatterydataResponse;

import java.util.List;

public interface BatteryService {
    List<BatteryCodeResponse> getBatteries();

    BatterydataResponse getBattery(String code);

    List<BatteryCodeResponse> getReceivedBatteries(Long memberId);

    Battery updateBatteryStatue(Long batteryId, Status status);
}
