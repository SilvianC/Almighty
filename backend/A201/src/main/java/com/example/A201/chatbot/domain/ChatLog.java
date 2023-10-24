package com.example.A201.chatbot.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import com.example.A201.member.domain.Member;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class ChatLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member; // 로그인한 멤버 정보

    @Column(columnDefinition="TEXT")
    private String userMessage;

    @Column(columnDefinition="TEXT")
    private String botResponse;

    @Column(nullable = false)
    private LocalDateTime timestamp = LocalDateTime.now();

    @Builder
    public ChatLog(Member member, String userMessage, String botResponse) {
        this.member = member;
        this.userMessage = userMessage;
        this.botResponse = botResponse;
    }

    // package-private setter
    public void setMember(Member member) {
        this.member = member;
    }
}
