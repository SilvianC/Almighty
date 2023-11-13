package com.example.A201.battery.domain;

import com.google.firebase.database.annotations.NotNull;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

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

    @Setter
    @ColumnDefault("4.213")
    private Double overVoltageThreshold;  // 과전압 임계값

    @Setter
    @ColumnDefault("2.8")
    private Double underVoltageThreshold;  // 저전압 임계값

    @Setter
    @ColumnDefault("1.495")
    private Double overCurrentChargeThreshold; // 충전시 과전류 임계값

    @Setter
    @ColumnDefault("50")
    private Double maxTemperatureChargeThreshold; // 충전시 최고 온도 임계값

    @Setter
    @ColumnDefault("0")
    private Double minTemperatureChargeThreshold;  // 충전시 최저 온도 임계값

    @Setter
    @ColumnDefault("1.495")
    private Double overCurrentDischargeThreshold; // 방전시 과전류 임계값

    @Setter
    @ColumnDefault("55")
    private Double maxTemperatureDischargeThreshold; // 방전시 최고 온도 임계값

    @Setter
    @ColumnDefault("-5")
    private Double minTemperatureDischargeThreshold;  // 방전시 최저 온도 임계값
}
