package com.example.A201.battery.vo.response;

import com.example.A201.battery.constant.Status;
import com.example.A201.battery.domain.StatusHistory;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class StatusHistoryResponse {
    private Long historyId;
    private Long batteryId;
    private String code;
    private Status fromStatus;
    private Status toStatus;
    private LocalDateTime date;
    private String reason;

    public static StatusHistoryResponse statusHistoryResponse(StatusHistory statusHistory){
        return StatusHistoryResponse.builder()
                .historyId(statusHistory.getHistoryId())
                .batteryId(statusHistory.getBatteryId().getId())
                .code(statusHistory.getBatteryId().getCode())
                .fromStatus(statusHistory.getFromStatus())
                .toStatus(statusHistory.getToStatus())
                .date(statusHistory.getDate())
                .reason(statusHistory.getResponseReason())
                .build();
    }
}
