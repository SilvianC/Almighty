package com.example.A201.battery.controller;

import com.example.A201.battery.dto.StatusHistoryDTO;
import com.example.A201.battery.service.StatusHistoryService;
import com.example.A201.battery.vo.request.StatusHistoryRequest;
import com.example.A201.battery.vo.response.StatusHistoryResponse;
import com.example.A201.exception.SuccessResponseEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/batteries")
@RequiredArgsConstructor
public class StatusHistoryController {
    private final StatusHistoryService statusHistoryService;

    @PostMapping("/history")
    @Transactional(readOnly = false)
    public ResponseEntity<?> postHistory(@RequestBody StatusHistoryRequest statusHistoryRequest) {
        StatusHistoryDTO statusHistoryDTO = statusHistoryService.requestToDTO(statusHistoryRequest);
        statusHistoryService.createHistory(statusHistoryDTO);
        return SuccessResponseEntity.toResponseEntity("히스토리 등록 완료", null);
    }

    @GetMapping("/history/{batteryId}")
    public ResponseEntity<?> getHistories(@PathVariable("batteryId") Long id){
        List<StatusHistoryResponse> responses = statusHistoryService.getHistories(id);
        return SuccessResponseEntity.toResponseEntity("히스토리 조회 완료", responses);
    }

    @GetMapping("history/all")
    public ResponseEntity<?> getAllHistories(@PageableDefault(size = 20) Pageable pageable){
        Page<StatusHistoryResponse> responses = statusHistoryService.getAllHistories(pageable);
        return SuccessResponseEntity.toResponseEntity("모든 히스토리 조회 완료", responses);
    }

    @GetMapping("history/members/{memberId}")
    public ResponseEntity<?> getAllHistories(@PathVariable("memberId") Long id, @PageableDefault(size = 20) Pageable pageable){
        Page<StatusHistoryResponse> responses = statusHistoryService.getAllHistoriesByMember(id, pageable);
        return SuccessResponseEntity.toResponseEntity("히스토리 조회 완료", responses);
    }
}
