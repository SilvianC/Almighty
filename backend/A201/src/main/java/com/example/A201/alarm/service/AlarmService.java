package com.example.A201.alarm.service;

import com.example.A201.alarm.dto.AlarmDto;
import com.example.A201.alarm.vo.AlarmResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface AlarmService {
    void insertAlarm(AlarmDto alarmDto);

    Page<AlarmResponse> getAlarm(Long id, String status, PageRequest pageRequest);
}
