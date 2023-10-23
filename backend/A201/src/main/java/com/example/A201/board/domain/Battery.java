package com.example.A201.board.domain;

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

    private float overVoltage;   // 과전압 임계값

    private float underVoltage;  // 저전압 임계값

    private float chargingOverCurrent; // 충전시 과전류 임계값

    private float dischargingOverCurrent;  // 방전시 과전류 임계값

    private int chargingMaxTemperature; // 충전시 최고 온도 임계값

    private int chargingMinTemperature;  // 충전시 최저 온도 임계값

    private int dischargingMaxTemperature;  // 방전시 최고 온도 임계값

    private int dischargingMinTemperature;  // 방전시 최저 온도 임계값

    private LocalDate madeDate;

    private LocalDate receiveDate;

}
