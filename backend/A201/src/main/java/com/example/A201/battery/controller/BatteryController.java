package com.example.A201.battery.controller;

import com.example.A201.battery.service.BatteryService;
import com.example.A201.battery.vo.BatteryResponse;
import com.example.A201.battery.vo.BatterydataResponse;
import com.example.A201.exception.SuccessResponseEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/batteries")
@RequiredArgsConstructor
public class BatteryController {
    private final BatteryService batteryService;

    @GetMapping("/battery/{code}")
    public ResponseEntity<?> getBattery(@PathVariable("code") String code) {
        BatterydataResponse response = batteryService.getBattery(code);
        return SuccessResponseEntity.toResponseEntity("배터리 데이터 불러오기 성공", response);
    }

    @GetMapping
    public ResponseEntity<?> getBatteryList() {
        List<BatteryResponse> responses = batteryService.getBatteriesAll();
        return SuccessResponseEntity.toResponseEntity("배터리 데이터 불러오기 성공", responses);
    }

    @GetMapping("/member/{memberid}")
    public ResponseEntity<?> getMemberBattery(@PathVariable("memberid") Long memberId) {
        List<BatteryResponse> responses = batteryService.getBatteries(memberId);
        return SuccessResponseEntity.toResponseEntity("배터리 데이터 불러오기 성공", responses);
    }
}
