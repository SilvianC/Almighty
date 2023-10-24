package com.example.A201.board.service;

import com.example.A201.board.domain.Battery;
import com.example.A201.board.repository.BatteryRepository;
import com.example.A201.board.vo.BatteryCodeResponse;
import com.example.A201.board.vo.BatterydataResponse;
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
    public List<BatteryCodeResponse> getBatteries() {
        List<Battery> batteries = batteryRepository.findAll();
        return batteries.stream().map(battery -> BatteryCodeResponse.batteryCodeResponse(battery)).collect(Collectors.toList());
    }
    @Override
    public BatterydataResponse getBattery(String code){
        return batteryRepository.findByCode(code).map(battery -> BatterydataResponse.batteryResponse(battery))
                .orElseThrow(() -> new IllegalStateException("해당 배터리를 찾을 수 없습니다"));
    }
}
