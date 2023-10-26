package com.example.A201.battery.vo;

import com.example.A201.battery.domain.Battery;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BatteryResponse {
    private String code;

    private LocalDate madeDate;

    private LocalDate receiveDate;

    public static BatteryResponse batteryCodeResponse(Battery battery){
        return BatteryResponse.builder().code(battery.getCode()).madeDate(battery.getMadeDate()).receiveDate(battery.getReceiveDate()).build();
    }
}
