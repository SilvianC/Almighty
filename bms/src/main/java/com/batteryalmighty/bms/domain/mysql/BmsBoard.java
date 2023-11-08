package com.batteryalmighty.bms.domain.mysql;

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
    @Column(name = "bms_board_id")
    Long id;

    private int overVoltageCount;

    private int underVoltageCount;

    private int overCurrentCount;

    private int abnormalTemperatureCount;

    private Double maxVoltageCharge;

    private Double minVoltageCharge;

    private Double maxVoltageDischarge;

    private Double minVoltageDischarge;

    private Double maxTemperatureCharge;

    private Double minTemperatureCharge;

    private Double maxTemperatureDischarge;

    private Double minTemperatureDischarge;

    @Column(name = "made_date")
    private LocalDate madeDate;

    @Column(name = "receive_date")
    private LocalDate receiveDate;

}
