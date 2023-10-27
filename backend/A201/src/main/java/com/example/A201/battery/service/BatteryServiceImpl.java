package com.example.A201.battery.service;

import com.example.A201.battery.constant.Status;
import com.example.A201.battery.domain.Battery;
import com.example.A201.battery.dto.BatteryDTO;
import com.example.A201.battery.repository.BatteryRepository;
import com.example.A201.battery.vo.BatteryResponse;
import com.example.A201.battery.vo.BatterydataResponse;
import com.google.cloud.storage.Option;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BatteryServiceImpl implements BatteryService{

    private final BatteryRepository batteryRepository;
    @Override
    public List<BatteryResponse> getBatteriesAll() {
        List<Battery> batteries = batteryRepository.findAll();
        return batteries.stream().map(battery -> BatteryResponse.batteryCodeResponse(battery)).collect(Collectors.toList());
    }
    @Override
    public BatterydataResponse getBattery(String code){
        return batteryRepository.findByCode(code).map(battery -> BatterydataResponse.batteryResponse(battery))
                .orElseThrow(() -> new IllegalStateException("해당 배터리를 찾을 수 없습니다"));
    }

    @Override
    @Transactional
    public Battery updateBatteryStatue(Long batteryId, Status status) {
        Optional<Battery> battery = batteryRepository.findById(batteryId);
        battery.get().setBatteryStatus(status);
        return batteryRepository.save(battery.get());
    }

    @Override
    public List<BatteryResponse> getBatteries(Long memberId){
        List<Battery> batteries = batteryRepository.findByMember(memberId);
        return batteries.stream().map(battery -> BatteryResponse.batteryCodeResponse(battery)).collect(Collectors.toList());
    }

    @Override
    public List<BatteryResponse> getRequestBatteries(){
        List<Battery> batteries = batteryRepository.findByBatteryStatus();
        return batteries.stream().map(battery -> BatteryResponse.batteryCodeResponse(battery)).collect(Collectors.toList());
    }
}
