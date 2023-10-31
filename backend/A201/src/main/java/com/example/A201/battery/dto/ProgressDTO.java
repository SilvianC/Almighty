package com.example.A201.battery.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProgressDTO {
    private String title;
    private String code;
    private String reason;
    private Long id;
}
