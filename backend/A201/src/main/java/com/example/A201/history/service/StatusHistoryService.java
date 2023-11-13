package com.example.A201.history.service;

import com.example.A201.history.domain.StatusHistory;
import com.example.A201.history.dto.StatusHistoryDTO;
import com.example.A201.history.vo.request.StatusHistoryRequest;
import com.example.A201.history.vo.response.StatusHistoryResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface StatusHistoryService {

    Page<StatusHistoryResponse> getAllHistories(Pageable pageable);

    List<StatusHistoryResponse> getHistories(Long batteryId);

    StatusHistoryResponse getHistory(Long HistoryId);

    Page<StatusHistoryResponse> getAllHistoriesByMember(Long memberId, Pageable pageable);

    StatusHistory createHistory(StatusHistoryDTO statusHistoryDTO);

    StatusHistoryDTO requestToDTO(StatusHistoryRequest request);


}
