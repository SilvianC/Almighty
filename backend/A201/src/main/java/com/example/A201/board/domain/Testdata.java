package com.example.A201.board.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Testdata {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "data_id")
    private Long id;

    @Column(name = "Voltage_measured")
    private Double voltageMeasured;

    @Column(name = "Current_measured")
    private Double currentMeasured;

    @Column(name = "Temperature_measured")
    private Double temperatureMeasured;

    @Column(name = "Current_load")
    private Double currentLoad;

    @Column(name = "Voltage_load")
    private Double voltageLoad;

    @Column(name = "Time")
    private Long time;

    @Column(name = "Sense_current")
    private Double senseCurrent;

    @Column(name = "Battery_current")
    private Double batteryCurrent;

    @Column(name = "Current_ratio")
    private Double currentRatio;

    @Column(name = "Battery_impedance")
    private Double batteryImpedance;

    @Column(name = "Rectified_Impedance")
    private Double rectifiedImpedance;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uid")
    private Metadata metadataId;

}
