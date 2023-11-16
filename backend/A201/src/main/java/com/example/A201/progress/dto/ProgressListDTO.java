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
    private String code;
    private LocalDateTime createDate;
    @Enumerated(EnumType.STRING)
    private ProgressStatus currentStatus;

    public ProgressListDTO(Long id, String companyName, String code, LocalDateTime createDate, ProgressStatus currentStatus) {
        this.id = id;
        this.companyName = companyName;
        this.code = code;
        this.createDate = createDate;
        this.currentStatus = currentStatus;
    }
}
