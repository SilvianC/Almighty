package com.example.A201.alarm.controller;

import com.example.A201.alarm.dto.AlarmDto;
import com.example.A201.alarm.service.AlarmService;
import com.example.A201.alarm.vo.PageResponse;
import com.example.A201.exception.SuccessResponseEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/alarm")
@Slf4j
public class AlarmController {
    private final AlarmService alarmService;

    /**
     *
     * @param id 유저 아이디
     * @param status 접근 권한자
     * @param pageIdx 페이지 번호
     * @return PageResponse
     */
    @GetMapping(value = {"/{fromMember}/{status}","/{status}"})
    public ResponseEntity<PageResponse> getAlarm(@PathVariable(value = "fromMember",required = false) Long id,
                                                 @PathVariable(value = "status",required = false) String status,
                                                 @RequestParam(defaultValue = "0", required = false) int pageIdx) {
        PageRequest pageRequest = PageRequest.of(pageIdx, 20);
        log.info("========================={}",status);
        return ResponseEntity.ok(PageResponse.PageResponse("알람 로그 입니다.",alarmService.getAlarm(id, status, pageRequest)));
    }

    @GetMapping("/user/{fromMember}")
    public ResponseEntity<PageResponse> getUserAlarm(@PathVariable(value = "fromMember",required = false) Long id,
                                                 @RequestParam(defaultValue = "0", required = false) int pageIdx) {
        PageRequest pageRequest = PageRequest.of(pageIdx, 20);

        return ResponseEntity.ok(PageResponse.PageResponse("유저 알람 로그 입니다.",alarmService.getAlarm(id, "유저", pageRequest)));
    }

    @GetMapping("/count/{memberId}")
    public ResponseEntity<?> countAlarm(@PathVariable(value = "memberId") Long id) {
        Long aLong = alarmService.countAlarm(id);
        Map<String,Long> map = new HashMap<>();
        map.put("count",aLong);
        return ResponseEntity.ok(map);
    }

    @PutMapping("{memberId}")
    public ResponseEntity<?> updateAlarm(@PathVariable(value = "memberId") Long id) {
        log.info("유저 아이디 = {}",id);
        alarmService.updateAlarm(id);
        return ResponseEntity.ok("굳");
    }

    @PostMapping
    public ResponseEntity insertAlarm(@RequestBody AlarmDto alarmDto) {
        alarmService.insertAlarm(alarmDto);
        return ResponseEntity.ok("알람 등록 완료");
    }

    @DeleteMapping("/{alarmId}")
    public ResponseEntity<SuccessResponseEntity> deleteAlarm(@PathVariable("alarmId") Long alarmId) {
        alarmService.deleteAlarm(alarmId);
        return SuccessResponseEntity.toResponseEntity("알람이 삭제 되었습니다.",null);
    }
}
