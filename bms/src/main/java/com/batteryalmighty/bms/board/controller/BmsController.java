package com.batteryalmighty.bms.bmsboard.controller;

import com.batteryalmighty.bms.exception.SuccessResponseEntity;
import com.batteryalmighty.bms.processing.BmsProcessing;
import com.batteryalmighty.bms.processing.Ekf;
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
    private final BmsProcessing bmsProcessing;
    private final Ekf ekf;

    @PostMapping("/upload/csv")
    public ResponseEntity<?> uploadCSVFile(@RequestParam("file") MultipartFile file) {
        bmsService.uploadCsv(file);
        return ResponseEntity.ok().build();
//        return SuccessResponseEntity.toResponseEntity("배터리 데이터 불러오기 성공", bmsService.uploadCsv(file));
    }

    @GetMapping("/vits")
    public ResponseEntity<?> getAllVitBoard(){
        return SuccessResponseEntity.toResponseEntity("vit 데이터 불러오기 성공", bmsService.getVitBoardList());
    }


    @GetMapping("/ekf")
    public ResponseEntity<?> getMetadataType() {
//        bmsProcessing.predict();
        return ResponseEntity.ok().build();
    }
}
