package com.example.A201.battery.service;

import com.example.A201.battery.constant.Status;
import com.example.A201.battery.domain.Battery;
import com.example.A201.battery.domain.StatusHistory;
import com.example.A201.battery.dto.StatusHistoryDTO;
import com.example.A201.battery.repository.StatusHistoryRepository;
import com.example.A201.battery.vo.response.StatusHistoryResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StatusHistoryServiceImpl implements StatusHistoryService{
    private final StatusHistoryRepository statusHistoryRepository;

    @Override
    public List<StatusHistoryResponse> getHistories(Long batteryId) {
        List<StatusHistory> histories = statusHistoryRepository.findByBatteryId(batteryId);
        return histories.stream().map(history -> StatusHistoryResponse.statusHistoryResponse(history)).collect(Collectors.toList());
    }

    @Override
    public Battery createHistory(StatusHistoryDTO statusHistoryDTO) {
        Status fromStatus = statusHistoryDTO.getFromStatus();
        Status toStatus = statusHistoryDTO.getToStatus();
        StatusHistory statusHistory = StatusHistory.builder()
                .batteryId(statusHistoryDTO.getBatteryId())
                .fromStatus(statusHistoryDTO.getFromStatus())
                .toStatus(statusHistoryDTO.getToStatus())
                .date()


        return null;
    }
}
