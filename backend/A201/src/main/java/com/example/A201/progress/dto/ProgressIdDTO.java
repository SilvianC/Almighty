package com.example.A201.progress.dto;

import com.example.A201.progress.domain.Progress;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProgressIdDTO {
    private Long progressId;
    private Long batteryId;
    private String code;
}
