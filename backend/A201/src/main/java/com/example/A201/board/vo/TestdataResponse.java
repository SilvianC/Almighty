package com.example.A201.board.vo;

import com.example.A201.board.domain.Testdata;
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
public class TestdataResponse {
    private Double voltageMeasured;

    private Double currentMeasured;

    private Double temperatureMeasured;

    private Double currentLoad;

    private Double voltageLoad;

    private Long time;

    private String senseCurrent;

    private String batteryCurrent;

    private String currentRatio;

    private String batteryImpedance;

    private String rectifiedImpedance;

    public static TestdataResponse testdataResponse(Testdata testdata){
         return TestdataResponse.builder()
            .voltageMeasured(testdata.getVoltageMeasured())
            .currentMeasured(testdata.getCurrentMeasured())
            .temperatureMeasured(testdata.getTemperatureMeasured())
            .currentLoad(testdata.getCurrentLoad())
            .voltageLoad(testdata.getVoltageLoad())
            .time(testdata.getTime())
            .senseCurrent(testdata.getSenseCurrent())
            .batteryCurrent(testdata.getBatteryCurrent())
            .currentRatio(testdata.getCurrentRatio())
            .batteryImpedance(testdata.getBatteryImpedance())
            .rectifiedImpedance(testdata.getRectifiedImpedance())
            .build();
    }
}
