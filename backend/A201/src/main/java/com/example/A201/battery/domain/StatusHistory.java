package com.example.A201.battery.domain;

import com.example.A201.battery.constant.Status;
import com.example.A201.battery.dto.StatusHistoryDTO;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class StatusHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "history_id")
    private Long historyId;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "battery_id")
    private Battery batteryId;

    @Enumerated(EnumType.STRING)
    private Status fromStatus;

    @Enumerated(EnumType.STRING)
    private Status toStatus;

    @CreatedDate
    private LocalDate date;

    private String responseReason;

    private String requestReason;

    public static StatusHistory registerHistory(StatusHistoryDTO statusHistoryDTO,Battery battery){
        StatusHistory history = new StatusHistory();
        history.batteryId = battery;
        history.fromStatus = statusHistoryDTO.getFromStatus();
        history.toStatus = statusHistoryDTO.getToStatus();
        history.date = LocalDate.now();
        history.responseReason = statusHistoryDTO.getReason();
        return history;
    }

}
