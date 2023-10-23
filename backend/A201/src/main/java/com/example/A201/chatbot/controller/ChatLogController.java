package com.example.A201.chatbot.controller;

import com.example.A201.chatbot.dto.ChatLogDto;
import com.example.A201.chatbot.service.ChatLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat")
public class ChatLogController {

    @Autowired
    private ChatLogService chatLogService;

    @PostMapping("/interact")
    public ResponseEntity<ChatLogDto> interactWithBot(@RequestBody ChatLogDto request) {
        ChatLogDto response = chatLogService.chatWithBot(request);
        return ResponseEntity.ok(response);
    }
}
