package com.example.A201.board.domain;

import com.example.A201.board.constant.Fault;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BmsFaultDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bms_fault_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    private Fault fault;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bms_board_id")
    private BmsBoard bmsBoard;




}
