package com.example.A201.battery.service;

import com.example.A201.battery.dto.ProgressListDTO;
import com.example.A201.battery.dto.ProgressResultDTO;

import java.util.List;

public interface ProgressService {
    void registProgress(String code, String reason);

    List<ProgressListDTO> getRequestProgress();

    List<ProgressListDTO> getFinishedProgress();

    void progressResult(ProgressResultDTO progressResultDTO);
}
