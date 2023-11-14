package com.example.A201.chatbot.domain;

import com.example.A201.member.domain.Member;
import com.example.A201.progress.domain.Progress;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="progress_id")
    private Progress progress;

    @Column(columnDefinition="TEXT")
    private String botResponse;

    @Column(nullable = false)
    private LocalDateTime timestamp = LocalDateTime.now();

    @Builder
    public ChatLog(Member member, String userMessage, Progress progress, String botResponse) {
        this.member = member;
        this.userMessage = userMessage;
        this.progress = progress;
        this.botResponse = botResponse;
    }

    // package-private setter
    public void setMember(Member member) {
        this.member = member;
    }
}
