package com.example.A201.history.vo.response;

import com.example.A201.history.constant.ResultStatus;
import com.example.A201.history.domain.StatusHistory;
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
public class StatusHistoryResponse {
    private Long historyId;
    private Long batteryId;
    private String code;
    private ResultStatus expertStatus;
//    private Status fromStatus;
//    private Status toStatus;
    private LocalDateTime date;
    private String reason;

    public static StatusHistoryResponse statusHistoryResponse(StatusHistory statusHistory){
        return StatusHistoryResponse.builder()
                .historyId(statusHistory.getId())
                .batteryId(statusHistory.getBattery().getId())
                .code(statusHistory.getBattery().getCode())
                .expertStatus(statusHistory.getExpertStatus())
//                .fromStatus(statusHistory.getFromStatus())
//                .toStatus(statusHistory.getToStatus())
                .date(statusHistory.getCreatedDate())
                .reason(statusHistory.getResponseReason())
                .build();
    }
}
