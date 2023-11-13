package com.example.A201.progress.dto;

import com.example.A201.progress.constant.ProgressStatus;
import lombok.*;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ProgressListDTO {

    private Long id;
    private String companyName;
    private String modelName;
    private LocalDateTime createDate;
    @Enumerated(EnumType.STRING)
    private ProgressStatus currentStatus;

    public ProgressListDTO(Long id, String companyName, String modelName, LocalDateTime createDate, ProgressStatus currentStatus) {
        this.id = id;
        this.companyName = companyName;
        this.modelName = modelName;
        this.createDate = createDate;
        this.currentStatus = currentStatus;
    }
}
