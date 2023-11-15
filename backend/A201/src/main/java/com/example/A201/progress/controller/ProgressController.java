package com.example.A201.progress.controller;

import com.example.A201.progress.dto.ProgressDTO;
import com.example.A201.progress.dto.ProgressIdDTO;
import com.example.A201.progress.dto.ProgressResultDTO;
import com.example.A201.exception.SuccessResponseEntity;
import com.example.A201.progress.service.ProgressService;
import com.example.A201.progress.vo.MailInfo;
import com.example.A201.words.service.WordService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/batteries/progress")
@RequiredArgsConstructor
@Slf4j
public class ProgressController {

    private final ProgressService progressService;
    private final WordService wordService;

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
        MailInfo mailInfo = progressService.progressResult(progressId, progress);
        try {
            wordService.createWordDocument(progress,  "_" + progress.getProgressId() + ".docx");
            log.info("Word 파일이 성공적으로 생성되었습니다.");
        } catch (IOException | InvalidFormatException e) {
            e.printStackTrace();
            log.info("Word 파일 생성에 실패하였습니다.");
        }
        progressService.sendMail(mailInfo.getEmail(), mailInfo.getCode(), mailInfo.getResult());
        return SuccessResponseEntity.toResponseEntity("반품 분석 완료", null);
    }
}
