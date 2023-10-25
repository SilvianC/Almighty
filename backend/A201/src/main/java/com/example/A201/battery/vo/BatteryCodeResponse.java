package com.example.A201.board.vo;

import com.example.A201.board.domain.Battery;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BatteryCodeResponse {
    private String code;

    public static BatteryCodeResponse batteryCodeResponse(Battery battery){
        return BatteryCodeResponse.builder().code(battery.getCode()).build();
    }
}
