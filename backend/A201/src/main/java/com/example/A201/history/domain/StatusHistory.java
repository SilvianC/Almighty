package com.example.A201.battery.domain;

import com.example.A201.battery.constant.Status;
import com.example.A201.history.dto.StatusHistoryDTO;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

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
    private Battery battery;

    @Setter
    @Enumerated(EnumType.STRING)
    private Status fromStatus;

    @Setter
    @Enumerated(EnumType.STRING)
    private Status toStatus;

    @CreatedDate
    private LocalDateTime date;

    @Setter
    private String responseReason;

    @Setter
    private String requestReason;

    public static StatusHistory registerHistory(StatusHistoryDTO statusHistoryDTO,Battery battery){
        StatusHistory history = new StatusHistory();
        history.battery = battery;
        history.fromStatus = statusHistoryDTO.getFromStatus();
        history.toStatus = statusHistoryDTO.getToStatus();
        history.date = LocalDateTime.now();
        history.requestReason = statusHistoryDTO.getReason();
        return history;
    }

}
