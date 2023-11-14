package com.example.A201.board.vo;

import com.example.A201.board.domain.BmsBoard;
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
public class BmsResponse {
    private int overVoltageCount;

    private int underVoltageCount;

    private int overCurrentCount;

    private int overTemperatureCount;

    private int underTemperatureCount;

    private double maxVoltageCharge;

    private double minVoltageCharge;

    private double maxVoltageDischarge;

    private double minVoltageDischarge;

    private double maxTemperatureCharge;

    private double minTemperatureCharge;

    private double maxTemperatureDischarge;

    private double minTemperatureDischarge;

    public static BmsResponse bmsResponse(BmsBoard bmsBoard){
        return BmsResponse.builder()
//                .abnormalTemperatureCount(bmsBoard.getAbnormalTemperatureCount())
                .overCurrentCount(bmsBoard.getOverCurrentCount())
                .overVoltageCount(bmsBoard.getOverVoltageCount())
                .underVoltageCount(bmsBoard.getUnderVoltageCount())
                .overTemperatureCount(bmsBoard.getOverTemperatureCount())
                .underTemperatureCount(bmsBoard.getUnderTemperatureCount())
                .maxVoltageCharge(bmsBoard.getMaxVoltageCharge())
                .minVoltageCharge(bmsBoard.getMinVoltageCharge())
                .maxVoltageDischarge(bmsBoard.getMaxVoltageDischarge())
                .minVoltageDischarge(bmsBoard.getMinVoltageDischarge())
                .maxTemperatureCharge(bmsBoard.getMaxTemperatureCharge())
                .minTemperatureCharge(bmsBoard.getMinTemperatureCharge())
                .maxTemperatureDischarge(bmsBoard.getMaxTemperatureDischarge())
                .minTemperatureDischarge(bmsBoard.getMinTemperatureDischarge())
                .build();
    }
}
