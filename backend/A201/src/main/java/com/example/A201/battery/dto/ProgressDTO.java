package com.example.A201.battery.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ProgressDTO {
    String title;
    String code;
    String reason;
    Long id;
}
