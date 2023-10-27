package com.example.A201.alarm.dto;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class AlarmDto {
    private String title;
    private String content;
    private Long member;
}
