package com.example.A201.progress.service;

import com.example.A201.progress.dto.ProgressDTO;
import com.example.A201.progress.dto.ProgressIdDTO;
import com.example.A201.progress.dto.ProgressListDTO;
import com.example.A201.progress.dto.ProgressResultDTO;
import com.example.A201.progress.vo.MailInfo;

import java.util.List;

public interface ProgressService {
    ProgressIdDTO registerRequestProgress(ProgressDTO progress);

    List<ProgressListDTO> getRequestProgress();

    List<ProgressListDTO> getFinishedProgress();

    MailInfo progressResult(Long progressId, ProgressResultDTO progressResultDTO);

    void sendMail(String email, String code, String result);

    void requestToBMS(ProgressIdDTO progressIdDTO);

}
