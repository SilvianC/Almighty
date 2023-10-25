package com.example.A201.battery.domain;

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

    private String modelName;

    private Double overVoltage;   // 과전압 임계값

    private Double underVoltage;  // 저전압 임계값

    private Double chargingOverCurrent; // 충전시 과전류 임계값

    private Double chargingMaxTemperature; // 충전시 최고 온도 임계값

    private Double chargingMinTemperature;  // 충전시 최저 온도 임계값

    private Double dischargingOverCurrent;  // 방전시 과전류 임계값

    private Double dischargingMaxTemperature;  // 방전시 최고 온도 임계값

    private Double dischargingMinTemperature;  // 방전시 최저 온도 임계값
}
