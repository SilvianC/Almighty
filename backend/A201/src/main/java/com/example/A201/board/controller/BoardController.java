package com.example.A201.board.controller;

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
    private final TestdataService testdataService;
    @GetMapping("/{uid}/testdatas")
    public ResponseEntity<?> readTestdataList(@PathVariable("uid") long uid){
        List<TestdataResponse> responses = testdataService.readTestdataList(uid);
        return ResponseEntity.ok().body(responses);
    }

}
