package com.example.A201.battery.vo.request;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class StatusHistoryRequest {
    private Long batteryId;
    private String fromStatus;
    private String toStatus;
    private String requestReason;
}
