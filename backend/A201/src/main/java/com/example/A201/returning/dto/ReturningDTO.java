package com.example.A201.returning.dto;

import com.example.A201.board.domain.Battery;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ReturningDTO {
    private Long id;

    private Battery batteryId;

    private String reason;

    private String status;
}
