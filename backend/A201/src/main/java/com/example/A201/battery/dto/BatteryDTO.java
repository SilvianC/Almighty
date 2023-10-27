package com.example.A201.battery.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
public class BatteryDTO {
    private Long id;
    private Long memberId;
    private Long modelId;
    private String code;
    private LocalDate madeDate;
    private LocalDate receiveDate;
    private String batteryStatus;
}
