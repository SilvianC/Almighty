package com.example.A201.member.dto;
import com.example.A201.member.domain.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;


@Data
@Builder
@AllArgsConstructor
public class MemberDTO {
    private long memberId;

    private String loginId;

    private String password;

    private String company;

    private Role role;

    private Boolean is_activated;

    private LocalDate createDate;

    private String email;

    private String tel;
}
