package com.example.A201.history.service;

import com.example.A201.battery.domain.Battery;
import com.example.A201.history.constant.ResultStatus;
import com.example.A201.history.domain.StatusHistory;
import com.example.A201.history.dto.StatusHistoryDTO;
import com.example.A201.battery.repository.BatteryRepository;
import com.example.A201.history.repository.StatusHistoryRepository;
import com.example.A201.history.vo.request.StatusHistoryRequest;
import com.example.A201.history.vo.response.StatusHistoryResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
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
    public Page<StatusHistoryResponse> getAllHistories(Pageable pageable) {
        Page<StatusHistory> histories = statusHistoryRepository.findAll(pageable);
        return new PageImpl<>(histories.stream().map(history -> StatusHistoryResponse.statusHistoryResponse(history)).collect(Collectors.toList()), pageable, histories.getTotalElements());
    }

    @Override
    public Page<StatusHistoryResponse> getAllHistoriesByMember(Long memberId, Pageable pageable) {
        Page<StatusHistory> histories = statusHistoryRepository.findAllByMember(memberId, pageable);
        return new PageImpl<>(histories.stream().map(history -> StatusHistoryResponse.statusHistoryResponse(history)).collect(Collectors.toList()), pageable, histories.getTotalElements());
    }

    @Override
    public List<StatusHistoryResponse> getHistories(Long batteryId) {
        List<StatusHistory> histories = statusHistoryRepository.findByBatteryId(batteryId);
        return histories.stream().map(history -> StatusHistoryResponse.statusHistoryResponse(history)).collect(Collectors.toList());
    }
    @Override
    public StatusHistoryResponse getHistory(Long HistoryId){
        StatusHistory hhistory = statusHistoryRepository.findById(HistoryId)
                .orElseThrow(() -> new IllegalStateException("해당하는 히스토리가 없습니다."));
        StatusHistoryResponse shr = StatusHistoryResponse.statusHistoryResponse(hhistory);
        return shr;
    }
    @Override
    public StatusHistory createHistory(StatusHistoryDTO statusHistoryDTO) {
        Battery battery = batteryRepository.findById(statusHistoryDTO.getBatteryId())
                .orElseThrow(() -> new EntityNotFoundException("해당 ID의 배터리를 찾을 수 없습니다"));

        StatusHistory statusHistory = StatusHistory.registerHistory(statusHistoryDTO,battery);
        statusHistory.setBattery(battery);
        return statusHistoryRepository.save(statusHistory);
    }

    @Override
    public StatusHistoryDTO requestToDTO(StatusHistoryRequest request) {
        Battery battery = batteryRepository.findById(request.getBatteryId())
                .orElseThrow(() -> new EntityNotFoundException("해당 ID의 배터리를 찾을 수 없습니다"));
        StatusHistoryDTO dto = new StatusHistoryDTO();
        dto.setBatteryId(battery.getId());
        dto.setExpertStatus(ResultStatus.valueOf(request.getExpertStatus()));
//        dto.setFromStatus(Status.valueOf(request.getFromStatus()));
//        dto.setToStatus(Status.valueOf(request.getToStatus()));
        dto.setReason(request.getRequestReason());
        return dto;
    }
}
