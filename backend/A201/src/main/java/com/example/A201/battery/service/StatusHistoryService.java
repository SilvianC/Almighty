package com.example.A201.battery.service;

import com.example.A201.battery.domain.StatusHistory;
import com.example.A201.battery.dto.StatusHistoryDTO;
import com.example.A201.battery.vo.request.StatusHistoryRequest;
import com.example.A201.battery.vo.response.StatusHistoryResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface StatusHistoryService {

    Page<StatusHistoryResponse> getAllHistories(Pageable pageable);

    List<StatusHistoryResponse> getHistories(Long batteryId);

    Page<StatusHistoryResponse> getAllHistoriesByMember(Long memberId, Pageable pageable);

    StatusHistory createHistory(StatusHistoryDTO statusHistoryDTO);

    StatusHistoryDTO requestToDTO(StatusHistoryRequest request);
}
