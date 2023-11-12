package com.example.A201.progress.dto;

import com.example.A201.progress.constant.ProgressStatus;
import lombok.*;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@NoArgsConstructor
public class ProgressListDTO {

    private Long id;
    private String companyName;
    private String modelName;
    private LocalDateTime createdDate;
    @Enumerated(EnumType.STRING)
    private ProgressStatus currentStatus;
}
