package com.example.A201.battery.controller;

import com.example.A201.battery.constant.Status;
import com.example.A201.battery.domain.Battery;
import com.example.A201.battery.service.BatteryService;
import com.example.A201.battery.vo.BatteryCodeResponse;
import com.example.A201.battery.vo.BatterydataResponse;
import com.example.A201.exception.SuccessResponseEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        List<BatteryCodeResponse> responses = batteryService.getBatteries();
        return SuccessResponseEntity.toResponseEntity("배터리 데이터 불러오기 성공", responses);
    }

    @GetMapping("/{memberId}")
    public ResponseEntity<?> getReceivedBatteryList(@PathVariable("memberId") Long memberId) {
        List<BatteryCodeResponse> responses = batteryService.getReceivedBatteries(memberId);
        return SuccessResponseEntity.toResponseEntity("내역 조회 완료", responses);
    }

    @PutMapping("/{batteryId}")
    public ResponseEntity<?> updateBatteryStatus(@PathVariable("batteryId") Long batteryId, @RequestParam("toStatus") Status status){
        Battery updateBattery = batteryService.updateBatteryStatue(batteryId, status);
        return SuccessResponseEntity.toResponseEntity("상태 변경 완료", null);
    }
}
