package com.batteryalmighty.bms.controller;

import com.batteryalmighty.bms.exception.SuccessResponseEntity;
import com.batteryalmighty.bms.service.BmsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/bms")
@RequiredArgsConstructor
public class BmsController {
    private final BmsService bmsService;

    @PostMapping("/upload/csv")
    public ResponseEntity<?> uploadCSVFile(@RequestParam("file") MultipartFile file) {
        return SuccessResponseEntity.toResponseEntity("베터리 데이터 불러오기 성공",  bmsService.uploadCsv(file));
    }

    @GetMapping("/vits")
    public ResponseEntity<?> getAllVitBoard(){
        return SuccessResponseEntity.toResponseEntity("vit 데이터 불러오기 성공", bmsService.getVitBoardList());
    }
}
