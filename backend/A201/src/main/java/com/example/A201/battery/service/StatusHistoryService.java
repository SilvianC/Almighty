package com.example.A201.battery.service;

import com.example.A201.battery.domain.StatusHistory;
import com.example.A201.battery.dto.StatusHistoryDTO;
import com.example.A201.battery.vo.request.StatusHistoryRequest;
import com.example.A201.battery.vo.response.StatusHistoryResponse;

import java.util.List;

public interface StatusHistoryService {

    List<StatusHistoryResponse> getAllHistories();

    List<StatusHistoryResponse> getHistories(Long batteryId);

    StatusHistory createHistory(StatusHistoryDTO statusHistoryDTO);

    StatusHistoryDTO requestToDTO(StatusHistoryRequest request);
}
