package com.example.A201.history.vo.request;

import lombok.Getter;

@Getter
public class StatusHistoryRequest {
    private Long batteryId;
    private String expertStatus;
//    private String fromStatus;
//    private String toStatus;
    private String requestReason;
}
