package com.batteryalmighty.bms.progress.dto;

import com.batteryalmighty.bms.progress.domain.Progress;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProgressIdDTO {
    private Long progressId;

    public ProgressIdDTO(Progress progress){
        this.progressId = progress.getId();
    }
}
