package com.example.A201.battery.dto;

import com.example.A201.battery.constant.Status;
import com.example.A201.battery.domain.Battery;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
public class StatusHistoryDTO {
    private Long historyId;
    private Battery batteryId;
    private Status fromStatus;
    private Status toStatus;
    private LocalDate date;
    private String reason;
}
