package com.example.A201.member.domain;

import com.example.A201.chatbot.domain.ChatLog;
import com.example.A201.member.dto.AuthDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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

    private String email;

    private String tel;

    private LocalDate createDate;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChatLog> chatLogs = new ArrayList<>();

    public static Member registerMember(AuthDto.SignupDto signupDto){
        Member member = new Member();
        member.loginId = signupDto.getLoginId();
        member.password = signupDto.getPassword();
        member.company = signupDto.getCompany();
        member.createDate = LocalDate.now();
        member.tel = signupDto.getTel();
        member.email = signupDto.getEmail();
        member.role = Role.USER;
        member.is_activated = true;
        return member;
    }

    public void deactivated() {
        this.is_activated = false;
    }

    public void update(String password) {
        this.password = password;
    }

    // 채팅 로그 추가
    public void addChatLog(ChatLog chatLog) {
        this.chatLogs.add(chatLog);
        chatLog.setMember(this);
    }

}
