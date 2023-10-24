package com.example.A201.board.domain;

import com.example.A201.board.constant.Status;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StatusHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "history_id")
    private Long historyId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "battery_id")
    private Battery batteryId;

    @Enumerated(EnumType.STRING)
    private Status fromStatue;

    @Enumerated(EnumType.STRING)
    private Status toStatus;

    private LocalDate date;

    private String reason;

}
