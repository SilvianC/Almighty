package com.example.A201.battery.dto;

import com.example.A201.battery.constant.Status;
import com.example.A201.battery.domain.Battery;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@NoArgsConstructor
public class ProgressListDTO {

    private Long id;
    private String companyName;
    private String modelName;
    private LocalDateTime createdDate;
    @Enumerated(EnumType.STRING)
    private Status currentStatus;
}
