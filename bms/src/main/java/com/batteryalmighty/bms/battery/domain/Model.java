package com.batteryalmighty.bms.battery.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Model {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "model_id")
    private Long id;

    private Double overVoltageThreshold;   // 과전압 임계값

    private Double underVoltageThreshold;  // 저전압 임계값

    private Double overCurrentChargeThreshold; // 충전시 과전류 임계값

    private Double maxTemperatureChargeThreshold; // 충전시 최고 온도 임계값

    private Double minTemperatureChargeThreshold;  // 충전시 최저 온도 임계값

    private Double overCurrentDischargeThreshold;  // 방전시 과전류 임계값

    private Double maxTemperatureDischargeThreshold;  // 방전시 최고 온도 임계값

    private Double minTemperatureDischargeThreshold;  // 방전시 최저 온도 임계값
}
