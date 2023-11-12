package com.example.A201.progress.controller;

import com.example.A201.progress.dto.ProgressDTO;
import com.example.A201.progress.dto.ProgressResultDTO;
import com.example.A201.exception.SuccessResponseEntity;
import com.example.A201.progress.service.ProgressService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/batteries/progress")
@RequiredArgsConstructor
@Slf4j
public class ProgressController {

    private final ProgressService progressService;

    @PostMapping("/request")
    public ResponseEntity<?> requestProgress(@RequestBody ProgressDTO progress) {
        progressService.registerRequestProgress(progress);
        return SuccessResponseEntity.toResponseEntity("반품 분석 요청 완료", null);
    }

    @GetMapping("/request")
    public ResponseEntity<?> getRequestProgress(){
        return SuccessResponseEntity.toResponseEntity("진행충인 요청 불러오기 완료", progressService.getRequestProgress());
    }

    @GetMapping("/finished")
    public ResponseEntity<?> getFinishedProgress(){
        return SuccessResponseEntity.toResponseEntity("완료 요청 불러오기 완료", progressService.getFinishedProgress());
    }

    @PutMapping("{progress_id}")
    public ResponseEntity<?> updateProgress(@PathVariable("progress_id") Long progressId, @RequestBody ProgressResultDTO progress){
        progressService.progressResult(progressId, progress);
        return SuccessResponseEntity.toResponseEntity("반품 분석 완료", null);
    }
}
