package com.example.A201.board.service;

import com.example.A201.board.domain.Battery;
import com.example.A201.board.repository.BatteryRepository;
import com.example.A201.board.vo.BatteryResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BatteryServiceImpl implements BatteryService{

    private final BatteryRepository batteryRepository;
    @Override
    public List<BatteryResponse> getBatteries() {
        List<Battery> batteries = batteryRepository.findAll();
        return batteries.stream().map(battery -> BatteryResponse.batteryResponse(battery)).collect(Collectors.toList());
    }
}
