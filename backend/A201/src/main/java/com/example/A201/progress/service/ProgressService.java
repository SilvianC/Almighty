package com.example.A201.progress.service;

import com.example.A201.progress.dto.ProgressDTO;
import com.example.A201.progress.dto.ProgressListDTO;
import com.example.A201.progress.dto.ProgressResultDTO;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface ProgressService {
    void registerRequestProgress(ProgressDTO progress);

    List<ProgressListDTO> getRequestProgress();

    List<ProgressListDTO> getFinishedProgress();

    void progressResult(Long progressId, ProgressResultDTO progressResultDTO);
}
