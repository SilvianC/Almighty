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

    int overVoltageCount;

    int underVoltageCount;

    int overCurrentCount;

    int abnormalTemperatureCount;

    @Column(name = "made_date")
    private LocalDate madeDate;

    @Column(name = "receive_date")
    private LocalDate receiveDate;

}
