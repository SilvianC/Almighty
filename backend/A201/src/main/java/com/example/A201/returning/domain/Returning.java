package com.example.A201.returning.domain;

import com.example.A201.member.domain.Member;
import com.example.A201.board.domain.Battery;
import com.example.A201.returning.constant.Status;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Returning {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "return_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "battery_id")
    private Battery batteryId;

    private String reason;

    private Status status;
}