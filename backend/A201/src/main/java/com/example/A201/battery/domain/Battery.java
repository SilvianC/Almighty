package com.example.A201.battery.domain;

import com.example.A201.member.domain.Member;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Battery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "battery_id")
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member memberId;

    private String code;

    private Double overVoltage;   // 과전압 임계값

    private Double underVoltage;  // 저전압 임계값

    private Double chargingOverCurrent; // 충전시 과전류 임계값

    private Double chargingMaxTemperature; // 충전시 최고 온도 임계값

    private Double chargingMinTemperature;  // 충전시 최저 온도 임계값

    private Double dischargingOverCurrent;  // 방전시 과전류 임계값

    private Double dischargingMaxTemperature;  // 방전시 최고 온도 임계값

    private Double dischargingMinTemperature;  // 방전시 최저 온도 임계값

    private LocalDate madeDate;

    private LocalDate receiveDate;

}
