package com.example.A201.board.vo;

import com.example.A201.board.domain.VitBoard;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class VitResponse {
    private Double voltageMeasured;

    private Double currentMeasured;

    private Double temperatureMeasured;

    private Double time;

    private Double soc;

    public static VitResponse vitResponse(VitBoard vitBoard){
        return VitResponse.builder()
                .voltageMeasured(vitBoard.getVoltage())
                .currentMeasured(vitBoard.getCurrent())
                .temperatureMeasured(vitBoard.getTemperature())
                .time(vitBoard.getTime())
                .soc(vitBoard.getEkf())
                .build();
    }
}
