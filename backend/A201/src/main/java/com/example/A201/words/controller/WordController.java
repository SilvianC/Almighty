package com.example.A201.words.controller;

import com.example.A201.words.service.WordService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/word")
@RequiredArgsConstructor
@Slf4j
public class WordController {

    @Autowired
    private final WordService wordService;


    @PostMapping("/createWord")
    public String createWordDocument(@RequestBody String content) throws InvalidFormatException {
        try {
            wordService.createWordDocument(content, "output.docx");
            return "Word 파일이 성공적으로 생성되었습니다.";
        } catch (IOException e) {
            e.printStackTrace();
            return "Word 파일 생성에 실패했습니다.";
        }
    }
}
