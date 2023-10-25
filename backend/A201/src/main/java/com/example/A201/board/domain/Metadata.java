package com.example.A201.board.domain;

import com.example.A201.battery.domain.Battery;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Metadata {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "uid")
    private Long id;
    private String type;
    private String startTime;
    private Integer ambientTemperature;
    private Long testId;
    @Column(name = "Capacity")
    private Double capacity;
    @Column(name = "Re")
    private Double re;
    @Column(name = "Rct")
    private Double rct;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "battery_id")
    private Battery batteryId;


}
