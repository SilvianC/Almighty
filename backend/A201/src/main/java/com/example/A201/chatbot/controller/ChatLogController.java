package com.example.A201.chatbot.controller;

import com.example.A201.chatbot.dto.ChatLogDto;
import com.example.A201.chatbot.service.ChatLogService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.A201.board.repository.BmsBoardRepository;
import com.example.A201.board.domain.BmsBoard;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@RestController
@RequestMapping("/api/chat")
@Slf4j
public class ChatLogController {

    @Autowired
    private ChatLogService chatLogService;
    @Autowired
    private BmsBoardRepository bmsBoardRepository;

    @PostMapping("/interact/{progressId}")
    public ResponseEntity<ChatLogDto> interactWithBot(@RequestBody ChatLogDto request) {
        BmsBoard bms = bmsBoardRepository.findByProgress(request.getProgressId()).orElseThrow(() -> new EntityNotFoundException("해당 데이터 찾을 수 없습니다"));
        log.debug("이게 맞노"+bms.getProgress());
        log.debug("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        ChatLogDto response = chatLogService.getAnswerFromChatGPT(request.getMemberId(), bms);
        return ResponseEntity.ok(response);
    }
}
