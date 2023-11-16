package com.example.A201.battery.controller;

import com.example.A201.battery.domain.Model;
import com.example.A201.battery.dto.ModelDTO;
import com.example.A201.battery.service.ModelService;
import com.example.A201.exception.SuccessResponseEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping("/change/{modelId}")
    public ResponseEntity<?> changeModel(@PathVariable("modelId")Long id, @RequestBody ModelDTO modelDto){
        Model model = modelService.changeThresholdOfModel(id, modelDto);
        return SuccessResponseEntity.toResponseEntity("모델 불러오기 성공", model);
    }
}
