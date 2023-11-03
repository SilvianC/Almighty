package com.example.A201.battery.domain;

import com.example.A201.battery.constant.Status;
import com.example.A201.member.domain.Member;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Battery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "battery_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "model_id")
    private Model model;

    private String code;

    @Column(name = "request_date")
    private LocalDate madeDate;

    @Column(name = "response_date")
    private LocalDate receiveDate;

    @Column(name = "battery_status")
    @Enumerated(EnumType.STRING)
    private Status batteryStatus;

    public void setBatteryStatus(Status status){
        this.batteryStatus = status;
    }

}
