package com.example.A201.board.domain;

import com.example.A201.battery.domain.Battery;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BmsBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bms_id")
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "battery_id")
    private Battery battery;

    int overVoltageCount;

    int underVoltageCount;

    int overCurrentCount;

    int abnormalTemperatureCount;

    @Column(name = "made_date")
    private LocalDate madeDate;

    @Column(name = "receive_date")
    private LocalDate receiveDate;

}
