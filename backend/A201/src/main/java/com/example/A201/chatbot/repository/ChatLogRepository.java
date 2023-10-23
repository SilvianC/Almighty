package com.example.A201.chatbot.repository;

import com.example.A201.chatbot.domain.ChatLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatLogRepository extends JpaRepository<ChatLog, Long> {
}
