package com.example.A201.battery.service;

import com.example.A201.battery.constant.Status;
import com.example.A201.battery.domain.Battery;
import com.example.A201.battery.domain.Progress;
import com.example.A201.battery.domain.StatusHistory;
import com.example.A201.battery.dto.ProgressListDTO;
import com.example.A201.battery.dto.ProgressResultDTO;
import com.example.A201.battery.repository.BatteryRepository;
import com.example.A201.battery.repository.ProgressRepository;
import com.example.A201.battery.repository.StatusHistoryRepository;
import com.example.A201.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.internet.MimeMessage;
import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProgressServiceImpl implements ProgressService{

    private final BatteryRepository batteryRepository;
    private final ProgressRepository progressRepository;
    private final StatusHistoryRepository statusHistoryRepository;
    private final JavaMailSender javaMailSender;

    @Override
    @Transactional
    public void registProgress(String code, String reason){
        Battery battery = batteryRepository.findByCode(code).orElseThrow(
                () -> new EntityNotFoundException("해당 배터리를 찾을 수 없습니다")
        );
        //Progress build = Progress.builder().batteryId(battery).currentStatus(Status.Request).reason(reason).build();
        progressRepository.save(Progress.builder().battery(battery).currentStatus(Status.Request).reason(reason).build());

        statusHistoryRepository.save(StatusHistory.builder()
                .toStatus(Status.Request)
                .fromStatus(battery.getBatteryStatus())
                .batteryId(battery)
                .requestReason(reason)
                .build());
        battery.setBatteryStatus(Status.Request);
    }

    @Override
    public List<ProgressListDTO> getRequestProgress(){
        return progressRepository.getRequestProgress();
    }

    @Override
    public List<ProgressListDTO> getFinishedProgress(){
        return progressRepository.getFinishedProgress();
    }

    @Override
    @Transactional
    public void progressResult(ProgressResultDTO progress){
        Progress p = progressRepository.findById(progress.getProgressId()).orElseThrow(() -> new EntityNotFoundException("해당 요청을 찾을 수 없습니다"));
        Battery battery = p.getBattery();
        Member member = battery.getMember();
        StatusHistory statusHistory = statusHistoryRepository.findByToStatusAndBatteryId(Status.Request, battery.getId());
        statusHistory.setFromStatus(Status.Request);
        statusHistory.setToStatus(p.getCurrentStatus());
        statusHistory.setResponseReason(progress.getResponseReason());
        statusHistoryRepository.save(statusHistory);
//        statusHistoryRepository.save(StatusHistory.builder()
//                .toStatus(progress.getToStatus())
//                .fromStatus(battery.getBatteryStatus())
//                .batteryId(battery)
//                .requestReason(p.getReason())
//                .responseReason(progress.getResponseReason())
//                .build());
        battery.setBatteryStatus(progress.getToStatus());
        p.changeStatus(progress.getToStatus());
        sendMail(member.getEmail(), battery.getCode(), progress.getToStatus().toString());
    }

    private void sendMail(String email, String code, String status){
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
            mimeMessageHelper.setTo(email); // 메일 수신자
            mimeMessageHelper.setSubject(code + " 배터리 반송 건에 대하여"); // 메일 제목
            mimeMessageHelper.setText(String.format("%s 배터리의 분석 결과 %s", code, status)); // 메일 본문 내용, HTML 여부
            javaMailSender.send(mimeMessage);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
