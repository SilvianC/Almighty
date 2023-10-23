package com.example.A201.chatbot.dto;

import com.example.A201.chatbot.domain.ChatLog;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatLogDto {

    private Long id;
    private String userMessage;
    private String botResponse;
    private LocalDateTime timestamp;
    private Long memberId;  // 로그인한 멤버의 ID

    // 기본 생성자, getter, setter, 그리고 필요한 다른 메서드들

    public static ChatLogDto fromEntity(ChatLog chatLog) {
        ChatLogDto dto = new ChatLogDto();
        dto.setId(chatLog.getId());
        dto.setUserMessage(chatLog.getUserMessage());
        dto.setBotResponse(chatLog.getBotResponse());
        dto.setTimestamp(chatLog.getTimestamp());
        if(chatLog.getMember() != null) {
            dto.setMemberId(chatLog.getMember().getMemberId());
        }
        return dto;
    }
}
