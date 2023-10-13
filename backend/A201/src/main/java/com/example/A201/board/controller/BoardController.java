package com.example.A201.board.controller;

import com.example.A201.board.service.MetadataService;
import com.example.A201.exception.SuccessResponseEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
import com.example.A201.board.service.TestdataService;
import com.example.A201.board.vo.TestdataResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class BoardController {
    private final MetadataService metadataService;

    @GetMapping("/metadata/{code}/{type}")
    public ResponseEntity<SuccessResponseEntity> getMetadataType(@PathVariable("code") String code,
                                                                 @PathVariable("type") String type) {
        return SuccessResponseEntity.toResponseEntity("베터리 코드와 타입별 데이터 불러오기 성공", metadataService.getMetadataType(code, type));
    }

    @GetMapping("/metadata/{code}")
    public ResponseEntity<SuccessResponseEntity> getMetadata(@PathVariable("code") String code) {
        return SuccessResponseEntity.toResponseEntity("베터리 코드와 타입별 데이터 불러오기 성공", metadataService.getMetadataCode(code));
    }

    private final TestdataService testdataService;
    @GetMapping("/{uid}/testdatas")
    public ResponseEntity<?> readTestdataList(@PathVariable("uid") long uid){
        List<TestdataResponse> responses = testdataService.readTestdataList(uid);
        return ResponseEntity.ok().body(responses);
    }

}
