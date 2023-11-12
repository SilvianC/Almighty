package com.example.A201.battery.domain;

import com.example.A201.battery.constant.Status;
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
    private Status currentStatus;

    private String reason;

    public void changeStatus(Status status){
        this.currentStatus = status;
    }

}
