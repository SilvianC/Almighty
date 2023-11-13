package com.example.A201.battery.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ModelDTO {
    private Double overVoltageThreshold;

    private Double underVoltageThreshold;

    private Double overCurrentChargeThreshold;

    private Double maxTemperatureChargeThreshold;

    private Double minTemperatureChargeThreshold;

    private Double overCurrentDischargeThreshold;

    private Double maxTemperatureDischargeThreshold;

    private Double minTemperatureDischargeThreshold;

}
