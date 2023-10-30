package com.example.A201.battery.service;

import com.example.A201.battery.constant.Status;
import com.example.A201.battery.domain.Battery;
import com.example.A201.battery.domain.StatusHistory;
import com.example.A201.battery.dto.StatusHistoryDTO;
import com.example.A201.battery.repository.BatteryRepository;
import com.example.A201.battery.repository.StatusHistoryRepository;
import com.example.A201.battery.vo.request.StatusHistoryRequest;
import com.example.A201.battery.vo.response.StatusHistoryResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class StatusHistoryServiceImpl implements StatusHistoryService{
    private final StatusHistoryRepository statusHistoryRepository;
    private final BatteryRepository batteryRepository;

    @Override
    public List<StatusHistoryResponse> getHistories(Long batteryId) {
        List<StatusHistory> histories = statusHistoryRepository.findByBatteryId(batteryId);
        return histories.stream().map(history -> StatusHistoryResponse.statusHistoryResponse(history)).collect(Collectors.toList());
    }

    @Override
    public StatusHistory createHistory(StatusHistoryDTO statusHistoryDTO) {
        Battery battery = batteryRepository.findById(statusHistoryDTO.getBatteryId())
                .orElseThrow(() -> new EntityNotFoundException("해당 ID의 배터리를 찾을 수 없습니다"));

        StatusHistory statusHistory = StatusHistory.registerHistory(statusHistoryDTO,battery);
        statusHistory.setBatteryId(battery);
        return statusHistoryRepository.save(statusHistory);
    }

    @Override
    public StatusHistoryDTO requestToDTO(StatusHistoryRequest request) {
        Battery battery = batteryRepository.findById(request.getBatteryId())
                .orElseThrow(() -> new EntityNotFoundException("해당 ID의 배터리를 찾을 수 없습니다"));
        StatusHistoryDTO dto = new StatusHistoryDTO();
        dto.setBatteryId(battery.getId());
        dto.setFromStatus(Status.valueOf(request.getFromStatus()));
        dto.setToStatus(Status.valueOf(request.getToStatus()));
        dto.setReason(request.getReason());
        return dto;
    }
}
