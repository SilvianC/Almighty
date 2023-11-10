package com.batteryalmighty.bms.controller;

import com.batteryalmighty.bms.processing.BmsProcessing;
import com.batteryalmighty.bms.processing.Ekf;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class Controller {
    private final Ekf ekf;
    private final BmsProcessing bmsProcessing;
    @GetMapping("/ekf")
    public ResponseEntity<?> getMetadataType() {
//        bmsProcessing.predict();
        return ResponseEntity.ok().build();
    }
}
