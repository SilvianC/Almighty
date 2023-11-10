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

    // 방전 추가 안해줌
    public static BatterydataResponse batteryResponse(Battery battery){
        if(battery.getModel() == null) return BatterydataResponse.builder().build();
        return BatterydataResponse.builder()
                .overVoltage(battery.getModel().getOverVoltageThreshold())
                .underVoltage(battery.getModel().getUnderVoltageThreshold())
                .overCurrent(battery.getModel().getOverCurrentChargeThreshold())
                .chargingMaxTemperature(battery.getModel().getMaxTemperatureChargeThreshold())
                .chargingMinTemperature(battery.getModel().getMinTemperatureChargeThreshold())
                .build();
    }
}
