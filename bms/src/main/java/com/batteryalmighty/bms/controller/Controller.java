package com.batteryalmighty.bms.controller;

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
    @GetMapping("/ekf")
    public ResponseEntity<?> getMetadataType() {
        ekf.predictx_(4);
        ekf.predictP();
        ekf.kalmanGain(1, 4);
        ekf.predictx(4);
        ekf.nextP();
        return ResponseEntity.ok().build();
    }
}
