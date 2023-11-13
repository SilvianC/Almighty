package com.example.A201.battery.service;

import com.example.A201.battery.domain.Model;
import com.example.A201.battery.dto.ModelDTO;
import com.example.A201.battery.repository.ModelRepository;
import com.example.A201.exception.CustomException;
import com.example.A201.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ModelServiceImpl implements ModelService{

    private final ModelRepository modelRepository;
    @Override
    public Model getModelById(Long id) {
        return modelRepository.findById(id).orElseThrow(
                ()-> new CustomException(ErrorCode.MODEL_NOT_FOUND));
    }

    @Transactional
    @Override
    public Model changeThresholdOfModel(Long id, ModelDTO modelDtO) {
        Model model = modelRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("해당하는 배터리 모델이 없습니다."));

        if(modelDtO.getOverVoltageThreshold() != null){
            model.setOverVoltageThreshold(modelDtO.getOverVoltageThreshold());
        }
        if(modelDtO.getUnderVoltageThreshold() != null){
            model.setUnderVoltageThreshold(modelDtO.getUnderVoltageThreshold());
        }
        if(modelDtO.getOverCurrentChargeThreshold() != null){
            model.setOverCurrentChargeThreshold(modelDtO.getOverCurrentChargeThreshold());
        }
        if(modelDtO.getOverCurrentDischargeThreshold() != null){
            model.setOverCurrentDischargeThreshold(modelDtO.getOverCurrentDischargeThreshold());
        }
        if(modelDtO.getMaxTemperatureChargeThreshold() != null){
            model.setMaxTemperatureChargeThreshold(modelDtO.getMaxTemperatureChargeThreshold());
        }
        if(modelDtO.getMinTemperatureChargeThreshold() != null){
            model.setMinTemperatureChargeThreshold(modelDtO.getMinTemperatureChargeThreshold());
        }
        if(modelDtO.getMaxTemperatureDischargeThreshold() != null){
            model.setMaxTemperatureDischargeThreshold(modelDtO.getMaxTemperatureDischargeThreshold());
        }
        if(modelDtO.getMinTemperatureDischargeThreshold() != null){
            model.setMinTemperatureDischargeThreshold(modelDtO.getMinTemperatureDischargeThreshold());
        }

        return model;
    }

}
