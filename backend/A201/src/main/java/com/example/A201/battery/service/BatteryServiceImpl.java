package com.example.A201.battery.service;

import com.example.A201.battery.constant.BatteryStatus;
import com.example.A201.battery.domain.Battery;
import com.example.A201.battery.domain.Model;
import com.example.A201.battery.dto.BatteryDTO;
import com.example.A201.battery.repository.BatteryRepository;
import com.example.A201.battery.repository.ModelRepository;
import com.example.A201.battery.vo.BatteryResponse;
import com.example.A201.battery.vo.BatteryDataResponse;
import com.example.A201.member.domain.Member;
import com.example.A201.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.example.A201.exception.ErrorCode.USER_NOT_FOUND;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BatteryServiceImpl implements BatteryService{

    private final BatteryRepository batteryRepository;
    private final MemberRepository memberRepository;
    private final ModelRepository modelRepository;

    @Transactional
    @Override
    public BatteryResponse registerBattery(BatteryDTO batteryDTO) {
        Model batterymodel = modelRepository.findByModelName(batteryDTO.getModelName())
                        .orElseGet(() ->{
                            Model model = Model.builder()
                                    .modelName(batteryDTO.getModelName())
                                    .overVoltageThreshold(4.213)
                                    .underVoltageThreshold(2.8)
                                    .overCurrentChargeThreshold(1.495)
                                    .overCurrentDischargeThreshold(0.0)
                                    .maxTemperatureChargeThreshold(50.0)
                                    .minTemperatureChargeThreshold(1.495)
                                    .maxTemperatureDischargeThreshold(55.0)
                                    .minTemperatureDischargeThreshold(-5.0)
                                    .build();
                            return modelRepository.save(model);
                        });
        Member member = memberRepository.findById(batteryDTO.getMemberId())
                .orElseThrow(() -> new IllegalStateException("해당하는 유저가 없습니다."));

        Battery battery = Battery.builder()
                .batteryStatus(BatteryStatus.Normal)
                .code(batteryDTO.getCode())
                .member(member)
                .model(batterymodel)
                .createDate(LocalDateTime.now())
                .build();
        batteryRepository.save(battery);

        return BatteryResponse.batteryResponse(battery);
    }

    @Override
    public List<BatteryResponse> getBatteriesAll() {
        List<Battery> batteries = batteryRepository.findAll();
        return batteries.stream().map(battery -> BatteryResponse.batteryResponse(battery)).collect(Collectors.toList());
    }
    @Override
    public BatteryDataResponse getBattery(String code){
        return batteryRepository.findByCode(code).map(battery -> BatteryDataResponse.batteryResponse(battery))
                .orElseThrow(() -> new IllegalStateException("해당 배터리를 찾을 수 없습니다"));
    }

//    @Override
//    @Transactional
//    public Battery updateBatteryStatue(Long batteryId, Status status) {
//        Optional<Battery> battery = batteryRepository.findById(batteryId);
//        battery.get().setBatteryStatus(status);
//        return batteryRepository.save(battery.get());
//    }

    @Override
    public Long getMemberId(Long batteryId){
        Optional<Battery> battery = batteryRepository.findById(batteryId);
        return battery.get().getMember().getMemberId();
    }

    @Override
    public List<BatteryResponse> getBatteries(Long memberId){
        List<Battery> batteries = batteryRepository.findByMember(memberId);
        return batteries.stream().map(battery -> BatteryResponse.batteryResponse(battery)).collect(Collectors.toList());
    }

    @Override
    public List<BatteryResponse> getRequestBatteries(){
        List<Battery> batteries = batteryRepository.findByBatteryStatus();
        return batteries.stream().map(battery -> BatteryResponse.batteryResponse(battery)).collect(Collectors.toList());
    }

}
