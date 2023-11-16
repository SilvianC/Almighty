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
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/batteries/progress")
@RequiredArgsConstructor
@Slf4j
public class ProgressController {

    private final ProgressService progressService;
    private final WordService wordService;

    @PostMapping("/request")
    public ResponseEntity<?> requestProgress(@RequestBody ProgressDTO progress) {
        ProgressIdDTO progressIdDTO = progressService.registerRequestProgress(progress);
        progressService.requestToBMS(progressIdDTO);
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
        byte[] wordDocument = null;
        HttpHeaders httpHeaders = new HttpHeaders();
        try {
            wordDocument = wordService.createWordDocument(progress, "_" + progress.getProgressId() + ".zip");
            log.info("Word 파일이 성공적으로 생성되었습니다.");
            httpHeaders.setContentType(MediaType.valueOf("application/vnd.openxmlformats-officedocument.wordprocessingml.document"));
            httpHeaders.setContentLength(wordDocument.length);
            httpHeaders.setContentDispositionFormData("attachment", "downloaded-file.docx");
            progressService.sendMail(mailInfo.getEmail(), mailInfo.getCode(), mailInfo.getResult());
        } catch (IOException | InvalidFormatException e) {
            e.printStackTrace();
            log.info("Word 파일 생성에 실패하였습니다.");
        }

        return new ResponseEntity<>(wordDocument, httpHeaders, HttpStatus.OK);
    }
}
