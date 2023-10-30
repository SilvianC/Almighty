package com.example.A201.alarm.controller;

import com.example.A201.alarm.dto.AlarmDto;
import com.example.A201.alarm.service.AlarmService;
import com.example.A201.alarm.vo.PageResponse;
import com.example.A201.exception.SuccessResponseEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/alarm")
public class AlarmController {
    private final AlarmService alarmService;

    /**
     *
     * @param id 유저 아이디
     * @param status 접근 권한자
     * @param pageIdx 페이지 번호
     * @return
     */
    @GetMapping(value = {"/{fromMember}/{status}","/{status}","/{fromMember}"})
    public ResponseEntity<PageResponse> getAlarm(@PathVariable(value = "fromMember",required = false) Long id,
                                                 @PathVariable("status") String status,
                                                 @RequestParam(defaultValue = "0", required = false) int pageIdx) {
        PageRequest pageRequest = PageRequest.of(pageIdx, 20, Sort.by(Sort.Direction.DESC, "createdDate"));

        return ResponseEntity.ok(PageResponse.PageResponse("알람 로그 입니다.",alarmService.getAlarm(id, status, pageRequest)));
    }

    @GetMapping("/user/{fromMember}")
    public ResponseEntity<PageResponse> getUserAlarm(@PathVariable(value = "fromMember",required = false) Long id,
                                                 @RequestParam(defaultValue = "0", required = false) int pageIdx) {
        PageRequest pageRequest = PageRequest.of(pageIdx, 20, Sort.by(Sort.Direction.DESC, "createdDate"));

        return ResponseEntity.ok(PageResponse.PageResponse("유저 알람 로그 입니다.",alarmService.getAlarm(id, null, pageRequest)));
    }


    @PostMapping
    public ResponseEntity insertAlarm(@RequestBody AlarmDto alarmDto) {
        alarmService.insertAlarm(alarmDto);
        return ResponseEntity.ok("알람 등록 완료");
    }

    @DeleteMapping
    public ResponseEntity<SuccessResponseEntity> readAlarm() {

        return SuccessResponseEntity.toResponseEntity("",null);
    }

}
