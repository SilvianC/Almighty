package com.example.A201.battery.controller;

import com.example.A201.alarm.domain.constant.Receiver;
import com.example.A201.alarm.domain.constant.Title;
import com.example.A201.alarm.dto.AlarmDto;
import com.example.A201.alarm.service.AlarmService;
import com.example.A201.battery.constant.Status;
import com.example.A201.battery.domain.Battery;
import com.example.A201.battery.dto.ProgressDTO;
import com.example.A201.battery.dto.ProgressResultDTO;
import com.example.A201.battery.service.BatteryService;
import com.example.A201.battery.vo.BatteryResponse;
import com.example.A201.battery.vo.BatterydataResponse;
import com.example.A201.exception.SuccessResponseEntity;
import com.example.A201.firebase.FCMNotificationRequestDto;
import com.example.A201.firebase.FCMNotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/batteries")
@RequiredArgsConstructor
@Slf4j
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

        batteryService.registProgress(progress);

        fcmNotificationService.sendNotificationByToken(FCMNotificationRequestDto.builder()
                .title(progress.getTitle())
                .body(progress.getReason())
                .targetUserId(progress.getId())
                .receiver(Receiver.fromReceiver(Title.fromTitle(progress.getTitle()).getTo()))
                .build());
        return SuccessResponseEntity.toResponseEntity("반품 요청 완료", null);
    }

    @GetMapping("progress/request")
    public ResponseEntity<?> getRequestProgress(){
        return SuccessResponseEntity.toResponseEntity("진행충인 요청 불러오기 완료", batteryService.getRequestProgress());
    }

    @GetMapping("progress/finished")
    public ResponseEntity<?> getFinishedProgress(){
        return SuccessResponseEntity.toResponseEntity("완료 요청 불러오기 완료", batteryService.getFinishedProgress());
    }

    @PutMapping("/progress/{progress_id}")
    public ResponseEntity<?> updateProgress(@PathVariable("progress_id") Long progressId, @RequestBody ProgressResultDTO progress){
        batteryService.progressResult(progress);

        String reason;
        if(progress.getResponseReason() == null) reason = progress.getRequestReason();
        else reason = progress.getResponseReason();

        Long member = batteryService.getMemberId(progress.getBatteryId());

        alarmService.insertAlarm(AlarmDto.builder()
                .title(String.valueOf(progress.getToStatus()))
                .content(reason)
                .member(member)
                .build());
        log.debug("여기까지 완료");
        fcmNotificationService.sendNotificationByToken(FCMNotificationRequestDto.builder()
                .title(String.valueOf(progress.getToStatus()))
                .body(reason)
                .targetUserId(member)
                .receiver(Receiver.fromReceiver("일반 사용자"))
                .build());
        return SuccessResponseEntity.toResponseEntity("요청 응답 완료", null);
    }
}
