package com.example.A201.board.domain;

import com.example.A201.progress.domain.Progress;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BmsBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bms_board_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "progress_id")
    private Progress progress;

    private int overVoltageCount;

    private int underVoltageCount;

    private int overCurrentCount;

    private int underTemperatureCount;

    private int overTemperatureCount;

    private Double maxVoltageCharge;

    private Double minVoltageCharge;

    private Double maxVoltageDischarge;

    private Double minVoltageDischarge;

    private Double maxTemperatureCharge;

    private Double minTemperatureCharge;

    private Double maxTemperatureDischarge;

    private Double minTemperatureDischarge;

    @CreatedDate
    private LocalDateTime receiveDate;
}
