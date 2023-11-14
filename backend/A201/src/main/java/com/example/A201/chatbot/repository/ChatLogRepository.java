package com.example.A201.chatbot.repository;

import com.example.A201.chatbot.domain.ChatLog;
import com.example.A201.progress.domain.Progress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface ChatLogRepository extends JpaRepository<ChatLog, Long> {


    @Query("select cl from ChatLog cl where cl.progress.id =: progressId")
    Optional<ChatLog> findByProgressId(@Param("progressId")Long progressId);

    @Transactional
    @Modifying
    @Query("update ChatLog cl set cl.botResponse = :botResponse where cl.progress.id = :progressId")
    void updateGptResponseByProgressId(@Param("progressId") Long progressId, @Param("botResponse") String botResponse);
}
