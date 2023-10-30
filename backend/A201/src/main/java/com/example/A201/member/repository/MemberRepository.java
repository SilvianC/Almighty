package com.example.A201.member.repository;

import com.example.A201.member.domain.Member;
import com.example.A201.member.domain.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByLoginId(String loginId);
    List<Member> findByRole(Role role);
}
