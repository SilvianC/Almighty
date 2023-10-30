package com.example.A201.battery.vo;

import com.example.A201.battery.domain.Battery;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BatteryCodeResponse {
    private String code;
    private LocalDate madeDate;
    private LocalDate receiveDate;
    private Long memberId;
    private String status;

    public static BatteryCodeResponse batteryCodeResponse(Battery battery){
        return BatteryCodeResponse.builder()
                .code(battery.getCode())
                .madeDate(battery.getMadeDate())
                .receiveDate(battery.getReceiveDate())
                .memberId(battery.getMember().getMemberId())
                .status(battery.getBatteryStatus().name())
                .build();
    }
}
