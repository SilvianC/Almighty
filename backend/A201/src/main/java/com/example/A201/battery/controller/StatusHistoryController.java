package com.example.A201.battery.controller;

import com.example.A201.battery.dto.StatusHistoryDTO;
import com.example.A201.battery.service.StatusHistoryService;
import com.example.A201.battery.vo.request.StatusHistoryRequest;
import com.example.A201.battery.vo.response.StatusHistoryResponse;
import com.example.A201.exception.SuccessResponseEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/batteries")
@RequiredArgsConstructor
public class StatusHistoryController {
    private final StatusHistoryService statusHistoryService;

    @PostMapping("")
    @Transactional(readOnly = false)
    public ResponseEntity<?> postHistory(@RequestBody StatusHistoryRequest statusHistoryRequest) {
        StatusHistoryDTO statusHistoryDTO = statusHistoryService.requestToDTO(statusHistoryRequest);
        statusHistoryService.createHistory(statusHistoryDTO);
        return SuccessResponseEntity.toResponseEntity("히스토리 등록 완료", null);
    }

    @GetMapping("history/{batteryId}")
    public ResponseEntity<?> getHistories(@PathVariable("batteryId") Long id){
        List<StatusHistoryResponse> responses = statusHistoryService.getHistories(id);
        return SuccessResponseEntity.toResponseEntity("히스토리 조회 완료", responses);
    }

    @GetMapping("history/all")
    public ResponseEntity<?> getAllHistories(){
        List<StatusHistoryResponse> responses = statusHistoryService.getAllHistories();
        return SuccessResponseEntity.toResponseEntity("모든 히스토리 조회 완료", responses);
    }

}
