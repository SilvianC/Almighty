package com.example.A201.battery.dto;

import com.example.A201.battery.constant.Status;
import lombok.*;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@NoArgsConstructor
public class ProgressResultDTO {
    private Long progressId;
    private Long batteryId;
    private Status fromStatus;
    private Status toStatus;
    private String responseReason;
    private String requestReason;
}
