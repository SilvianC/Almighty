package com.example.A201.battery.vo.request;

import lombok.Getter;

@Getter
public class StatusHistoryRequest {
    private Long batteryId;
    private String fromStatus;
    private String toStatus;
    private String reason;
}
