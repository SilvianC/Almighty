package com.example.A201.alarm.repository.querydsl;

import com.example.A201.alarm.vo.AlarmResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AlarmRepositoryCustom {

    Page<AlarmResponse> getAlarm(Long memberId, String status, Pageable pageable);
}
