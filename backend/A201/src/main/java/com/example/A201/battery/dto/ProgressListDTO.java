package com.example.A201.battery.dto;

import com.example.A201.battery.constant.Status;
import com.example.A201.battery.domain.Battery;
import lombok.*;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@NoArgsConstructor
public class ProgressListDTO {

    private Long progressId;
    private String companyName;
    private String modelName;
    private LocalDate createDate;
    @Enumerated(EnumType.STRING)
    private Status currentStatus;
}
