package com.example.A201.alarm.vo;

import com.example.A201.alarm.domain.Alarm;
import com.example.A201.alarm.domain.constant.Title;
import com.example.A201.alarm.service.AlarmService;
import com.example.A201.common.BooleanToYNConverter;
import com.example.A201.member.domain.Member;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AlarmResponse {

    private Long id;

    private String title;

    private String content;

    private Long member;

    private LocalDateTime time;

    public static AlarmResponse alarmResponse(Alarm alarm){
        return AlarmResponse.builder()
                .title(alarm.getTitle().getTitle())
                .content(alarm.getContent())
                .time(alarm.getCreatedDate()).build();
    }

}
