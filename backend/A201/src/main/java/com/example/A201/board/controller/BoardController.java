package com.example.A201.board.controller;

import com.example.A201.battery.service.BatteryService;
import com.example.A201.board.service.BoardService;
import com.example.A201.exception.SuccessResponseEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;

    @GetMapping("/{progress_id}")
    public ResponseEntity<?> getAllBoard(@PathVariable("progress_id") Long progressId) {
        return SuccessResponseEntity.toResponseEntity("베터리 데이터 불러오기 성공", boardService.getBoard(progressId));
    }

}
