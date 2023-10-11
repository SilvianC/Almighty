package com.example.A201.member.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@NoArgsConstructor
@Entity(name="members")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false, unique = true)
    private String loginId; // Principal

    @Column(nullable = false)
    private String password; // Credential

    @Column(nullable = false)
    private String company;

    @Enumerated(EnumType.STRING)
    private Role role; // 사용자 권한

    private Boolean is_activated;

    private LocalDate createDate;


}
