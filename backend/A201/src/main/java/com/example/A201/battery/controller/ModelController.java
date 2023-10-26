package com.example.A201.battery.controller;

import com.example.A201.battery.domain.Model;
import com.example.A201.battery.service.ModelService;
import com.example.A201.exception.SuccessResponseEntity;
import lombok.RequiredArgsConstructor;
import org.checkerframework.checker.units.qual.N;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/model")
@RequiredArgsConstructor
public class ModelController {
    private final ModelService modelService;

    @GetMapping("/{modelId}")
    public ResponseEntity<?> getModel(@PathVariable("modelId")Long id){
        Model model = modelService.getModelById(id);

        return SuccessResponseEntity.toResponseEntity("모델 불러오기 성공", model);
    }
}
