package com.example.A201.battery.service;

import com.example.A201.battery.domain.Battery;
import com.example.A201.battery.dto.StatusHistoryDTO;
import com.example.A201.battery.vo.response.StatusHistoryResponse;

import java.util.List;

public interface StatusHistoryService {
    List<StatusHistoryResponse> getHistories(Long batteryId);

    Battery createHistory(StatusHistoryDTO statusHistoryDTO);
}
