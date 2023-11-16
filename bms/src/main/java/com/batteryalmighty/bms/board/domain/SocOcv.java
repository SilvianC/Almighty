package com.batteryalmighty.bms.board.domain;

import lombok.*;

import javax.persistence.*;
@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SocOcv {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "soc_ocv_id")
    private Long id;

    private Double soc;

    private Double ocv;
}
