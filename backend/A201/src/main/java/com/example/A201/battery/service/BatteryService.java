package com.example.A201.battery.service;

import com.example.A201.battery.dto.BatteryDTO;
import com.example.A201.battery.vo.BatteryResponse;
import com.example.A201.battery.vo.BatteryDataResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BatteryService {
    BatteryResponse registerBattery(BatteryDTO batteryDTO);

    List<BatteryResponse> getBatteriesAll();

    BatteryDataResponse getBattery(String code);

    Long getMemberId(Long batteryId);

    Page<BatteryResponse> getBatteries(Long memberId, Pageable pageable);

//    Battery updateBatteryStatue(Long batteryId, BatteryStatus batteryStatus);

    List<BatteryResponse> getRequestBatteries();

}
