package com.example.A201.battery.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Bms {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bms_id")
    Long id;

}
