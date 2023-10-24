package com.example.A201.board.dto;

import com.example.A201.board.constant.Status;
import com.example.A201.board.domain.Battery;
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

    private Status fromStatue;

    private Status toStatus;

    private LocalDate date;

    private String reason;
}
