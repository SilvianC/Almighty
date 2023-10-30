package com.example.A201.battery.dto;

import com.example.A201.battery.constant.Status;
import com.example.A201.battery.domain.Battery;
import com.example.A201.battery.repository.BatteryRepository;
import com.example.A201.battery.vo.request.StatusHistoryRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StatusHistoryDTO {
    private Long historyId;
    private Long batteryId;
    private Status fromStatus;
    private Status toStatus;
    private LocalDate date;
    private String reason;
}
