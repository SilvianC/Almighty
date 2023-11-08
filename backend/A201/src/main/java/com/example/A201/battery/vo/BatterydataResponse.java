package com.example.A201.battery.vo;

import com.example.A201.battery.domain.Battery;
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
public class BatterydataResponse {
    private Double overVoltage;
    private Double underVoltage;
    private Double overCurrent;
    private Double chargingMaxTemperature;
    private Double chargingMinTemperature;

    public static BatterydataResponse batteryResponse(Battery battery){
        if(battery.getModel() == null) return BatterydataResponse.builder().build();
        return BatterydataResponse.builder()
                .overVoltage(battery.getModel().getOverVoltage())
                .underVoltage(battery.getModel().getUnderVoltage())
                .overCurrent(battery.getModel().getChargingOverCurrent())
                .chargingMaxTemperature(battery.getModel().getChargingMaxTemperature())
                .chargingMinTemperature(battery.getModel().getChargingMinTemperature())
                .build();
    }
}
