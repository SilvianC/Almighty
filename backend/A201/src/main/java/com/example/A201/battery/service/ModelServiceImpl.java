package com.example.A201.battery.service;

import com.example.A201.battery.domain.Model;
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
}
