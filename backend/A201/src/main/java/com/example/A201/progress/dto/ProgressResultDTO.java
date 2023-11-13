package com.example.A201.progress.dto;

import com.example.A201.history.constant.ResultStatus;
import lombok.*;

@Data
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@NoArgsConstructor
public class ProgressResultDTO {
    private Long progressId;
    private Long batteryId;
//    private Status fromStatus;
//    private Status toStatus;
    private ResultStatus resultStatus;
    private String responseReason;
    private String requestReason;
}
