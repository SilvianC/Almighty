package com.example.A201.board.controller;

import com.example.A201.board.service.MetadataService;
import com.example.A201.board.service.TestdataService;
import com.example.A201.board.vo.TestdataResponse;
import com.example.A201.exception.SuccessResponseEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class BoardController {
    private final MetadataService metadataService;
    private final TestdataService testdataService;

    @GetMapping("/metadata/{code}/{type}")
    public ResponseEntity<SuccessResponseEntity> getMetadataType(@PathVariable("code") String code,
                                                                 @PathVariable("type") String type) {
        return SuccessResponseEntity.toResponseEntity("베터리 코드와 타입별 데이터 불러오기 성공", metadataService.getMetadataType(code, type));
    }

    @GetMapping("/metadata/{code}")
    public ResponseEntity<SuccessResponseEntity> getMetadata(@PathVariable("code") String code) {
        return SuccessResponseEntity.toResponseEntity("베터리 코드와 타입별 데이터 불러오기 성공", metadataService.getMetadataCode(code));
    }

    @GetMapping("/{uid}/testdatas")
    public ResponseEntity<?> readTestdataList(@PathVariable("uid") Long uid) {
        List<TestdataResponse> responses = testdataService.readTestdataList(uid);
        return SuccessResponseEntity.toResponseEntity("테스트 데이터 불러오기 성공", responses);
    }

}
