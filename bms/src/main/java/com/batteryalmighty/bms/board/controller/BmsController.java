package com.batteryalmighty.bms.board.controller;

import com.batteryalmighty.bms.exception.SuccessResponseEntity;
import com.batteryalmighty.bms.board.service.BmsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bms")
@RequiredArgsConstructor
public class BmsController {
    private final BmsService bmsService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadBoard(@RequestParam Long progressId) {
        bmsService.uploadBoard(progressId);
        return ResponseEntity.ok().build();
//        return SuccessResponseEntity.toResponseEntity("배터리 데이터 불러오기 성공", bmsService.uploadCsv(file));
    }


    @GetMapping("/vits")
    public ResponseEntity<?> getAllVitBoard(){
        return SuccessResponseEntity.toResponseEntity("vit 데이터 불러오기 성공", bmsService.getVitBoardList());
    }

}
