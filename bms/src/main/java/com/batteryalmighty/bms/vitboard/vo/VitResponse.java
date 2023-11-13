package com.batteryalmighty.bms.vitboard.vo;

import com.batteryalmighty.bms.vitboard.domain.VitBoard;
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
public class VitResponse {

    private Double voltage;

    private Double current;

    private Double temperature;

    private Double time;

    private Double soc;

    public static VitResponse vitResponse(VitBoard vitBoard){
        return VitResponse.builder()
                .voltage(vitBoard.getVoltage())
                .current(vitBoard.getCurrent())
                .temperature(vitBoard.getTemperature())
                .time(vitBoard.getTime())
                .soc(vitBoard.getSoc())
                .build();
    }
}