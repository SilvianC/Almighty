package com.example.A201.history.domain;

import com.example.A201.common.BaseTime;
import com.example.A201.history.constant.ResultStatus;
import com.example.A201.battery.domain.Battery;
import com.example.A201.history.dto.StatusHistoryDTO;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class StatusHistory extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "history_id")
    private Long id;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "battery_id")
    private Battery battery;

//    @Setter
//    @Enumerated(EnumType.STRING)
//    private Status aiStatus;

    @Setter
    @Enumerated(EnumType.STRING)
    private ResultStatus expertStatus;

    @Setter
    private String responseReason;

    @Setter
    private String requestReason;

    public static StatusHistory registerHistory(StatusHistoryDTO statusHistoryDTO,Battery battery){
        StatusHistory history = new StatusHistory();
        history.battery = battery;
//        history.aiStatus = statusHistoryDTO.getFromStatus();
        history.expertStatus = statusHistoryDTO.getExpertStatus();
//        history.date = LocalDateTime.now();
        history.requestReason = statusHistoryDTO.getReason();
        return history;
    }

}
