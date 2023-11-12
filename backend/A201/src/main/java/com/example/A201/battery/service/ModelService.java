package com.example.A201.battery.service;

import com.example.A201.battery.domain.Model;
import com.example.A201.battery.dto.ModelDTO;

public interface ModelService {
    Model getModelById(Long id);

    Model changeThresholdOfModel(Long id, ModelDTO modelDtO);
}
