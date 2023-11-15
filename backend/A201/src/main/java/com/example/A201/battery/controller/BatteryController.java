package com.example.A201.battery.controller;

import com.example.A201.battery.dto.BatteryDTO;
import com.example.A201.battery.service.BatteryService;
import com.example.A201.battery.vo.BatteryResponse;
import com.example.A201.battery.vo.BatteryDataResponse;
import com.example.A201.exception.SuccessResponseEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/batteries")
@RequiredArgsConstructor
@Slf4j
public class BatteryController {
    private final BatteryService batteryService;

    @PostMapping("/request")
    public ResponseEntity<?> registerBattery(@RequestBody BatteryDTO batteryDTO){

        return SuccessResponseEntity.toResponseEntity("배터리 등록 완료", batteryService.registerBattery(batteryDTO));
    }

    @GetMapping("/battery/{code}")
    public ResponseEntity<?> getBattery(@PathVariable("code") String code) {
        BatteryDataResponse response = batteryService.getBattery(code);
        return SuccessResponseEntity.toResponseEntity("배터리 데이터 불러오기 성공", response);
    }

    @GetMapping
    public ResponseEntity<?> getBatteryList() {
        List<BatteryResponse> responses = batteryService.getBatteriesAll();
        return SuccessResponseEntity.toResponseEntity("배터리 데이터 불러오기 성공", responses);
    }

//    @PutMapping("/{batteryId}")
//    public ResponseEntity<?> updateBatteryStatus(@PathVariable("batteryId") Long batteryId, @RequestParam("batteryStatus") BatteryStatus batteryStatus) {
//        Battery updateBattery = batteryService.updateBatteryStatue(batteryId, batteryStatus);
//        return SuccessResponseEntity.toResponseEntity("상태 변경 완료", null);
//    }

    @GetMapping("/member/{memberid}")
    public ResponseEntity<?> getMemberBattery(@PathVariable("memberid") Long memberId,@PageableDefault(size = 10) Pageable pageable) {
        Page<BatteryResponse> responses = batteryService.getBatteries(memberId, pageable);
        return SuccessResponseEntity.toResponseEntity("배터리 데이터 불러오기 성공", responses);
    }

    @GetMapping("/request")
    public ResponseEntity<?> getRequestBattery() {
        List<BatteryResponse> responses = batteryService.getRequestBatteries();
        return SuccessResponseEntity.toResponseEntity("배터리 데이터 불러오기 성공", responses);
    }

}
