package com.example.A201.alarm.vo;

import com.example.A201.alarm.domain.Alarm;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AlarmResponse {

    private Long id;

    private String title;

    private String content;

    private Long member;

    private LocalDateTime time;

    private Boolean isRead;

    private String company;

    public static AlarmResponse alarmResponse(Alarm alarm){
        return AlarmResponse.builder()
                .title(alarm.getTitle().getTitle())
                .content(alarm.getContent())
                .time(alarm.getCreatedDate())
                .isRead(alarm.getIsRead())
                .company(alarm.getMember().getCompany()).build();
    }

}
