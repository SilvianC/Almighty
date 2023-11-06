package com.batteryalmighty.bms.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SocIr {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "soc_ir_id")
    private Long id;
}
