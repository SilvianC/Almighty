package com.example.A201.history.dto;

import com.example.A201.history.constant.ResultStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StatusHistoryDTO {
    private Long historyId;
    private Long batteryId;
//    private Status aiStatus;
    private ResultStatus expertStatus;
    private LocalDateTime date;
    private String reason;
}
