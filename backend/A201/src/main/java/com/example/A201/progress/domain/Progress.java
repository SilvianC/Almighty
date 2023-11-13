package com.example.A201.progress.domain;

import com.example.A201.progress.constant.ProgressStatus;
import com.example.A201.battery.domain.Battery;
import com.example.A201.common.BaseTime;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class Progress extends BaseTime{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "progress_id")
    private Long id;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "battery_id")
    private Battery battery;

//    @CreatedDate
//    private LocalDate createDate;

    @Enumerated(EnumType.STRING)
    private ProgressStatus currentStatus;

    private String reason;

    public void changeStatus(ProgressStatus progressStatus){
        this.currentStatus = progressStatus;
    }

}
