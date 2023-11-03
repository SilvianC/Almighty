package com.example.A201.board.domain;

import com.example.A201.battery.domain.Battery;
import com.example.A201.battery.domain.Progress;
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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "progress_id")
    private Progress progress;

    int overVoltageCount;

    int underVoltageCount;

    int overCurrentCount;

    int abnormalTemperatureCount;

    @Column(name = "made_date")
    private LocalDate madeDate;

    @Column(name = "receive_date")
    private LocalDate receiveDate;

}
