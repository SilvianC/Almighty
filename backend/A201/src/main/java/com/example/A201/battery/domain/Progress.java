package com.example.A201.battery.domain;

import com.example.A201.battery.constant.Status;
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
public class Progress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "progress_id")
    private Long progressId;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "battery_id")
    private Battery batteryId;

    @CreatedDate
    private LocalDate createDate;

    @Enumerated(EnumType.STRING)
    private Status currentStatus;

    private String reason;

    public void changeStatus(Status status){
        this.currentStatus = status;
    }

}
