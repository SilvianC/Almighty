package com.example.A201.battery.controller;

import com.example.A201.alarm.domain.constant.Receiver;
import com.example.A201.alarm.domain.constant.Title;
import com.example.A201.alarm.dto.AlarmDto;
import com.example.A201.alarm.service.AlarmService;
import com.example.A201.battery.constant.Status;
import com.example.A201.battery.domain.Battery;
import com.example.A201.battery.domain.Progress;
import com.example.A201.battery.dto.ProgressDTO;
import com.example.A201.battery.service.BatteryService;
import com.example.A201.battery.vo.BatteryResponse;
import com.example.A201.battery.vo.BatterydataResponse;
import com.example.A201.exception.SuccessResponseEntity;
import com.example.A201.firebase.FCMNotificationRequestDto;
import com.example.A201.firebase.FCMNotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/batteries")
@RequiredArgsConstructor
public class BatteryController {
    private final BatteryService batteryService;
    private final AlarmService alarmService;
    private final FCMNotificationService fcmNotificationService;

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

    @PutMapping("/{batteryId}")
    public ResponseEntity<?> updateBatteryStatus(@PathVariable("batteryId") Long batteryId, @RequestParam("toStatus") Status status) {
        Battery updateBattery = batteryService.updateBatteryStatue(batteryId, status);
        return SuccessResponseEntity.toResponseEntity("상태 변경 완료", null);
    }

    @GetMapping("/member/{memberid}")
    public ResponseEntity<?> getMemberBattery(@PathVariable("memberid") Long memberId) {
        List<BatteryResponse> responses = batteryService.getBatteries(memberId);
        return SuccessResponseEntity.toResponseEntity("배터리 데이터 불러오기 성공", responses);
    }

    @GetMapping("/request")
    public ResponseEntity<?> getRequestBattery() {
        List<BatteryResponse> responses = batteryService.getRequestBatteries();
        return SuccessResponseEntity.toResponseEntity("배터리 데이터 불러오기 성공", responses);
    }

    @PutMapping("/request")
    public ResponseEntity<?> updateBatteriesStatus(@RequestBody ProgressDTO progress) {

        batteryService.updateBatteriesStatus(progress.getCode(), progress.getReason());
        alarmService.insertAlarm(AlarmDto.builder()
                .title(progress.getTitle())
                .content(progress.getReason())
                .member(progress.getId())
                .build());
        fcmNotificationService.sendNotificationByToken(FCMNotificationRequestDto.builder()
                .title(progress.getTitle())
                .body(progress.getReason())
                .targetUserId(progress.getId())
                .receiver(Receiver.fromReceiver(Title.fromTitle(progress.getTitle()).getTo()))
                .build());
        return SuccessResponseEntity.toResponseEntity("반품 요청 완료", null);
    }

    @GetMapping("/progress")
    public ResponseEntity<?> getProgressList(){
        List<Progress> progressList = batteryService.getProgressAll();
        return SuccessResponseEntity.toResponseEntity("분석 완료 배터리 불러오기 성공", progressList);
    }
}
