package com.example.A201.progress.service;

import com.example.A201.alarm.domain.constant.Receiver;
import com.example.A201.alarm.domain.constant.Title;
import com.example.A201.alarm.dto.AlarmDto;
import com.example.A201.alarm.service.AlarmService;
import com.example.A201.battery.constant.BatteryStatus;
import com.example.A201.progress.constant.ProgressStatus;
import com.example.A201.battery.domain.Battery;
import com.example.A201.progress.domain.Progress;
import com.example.A201.history.domain.StatusHistory;
import com.example.A201.progress.dto.ProgressDTO;
import com.example.A201.progress.dto.ProgressIdDTO;
import com.example.A201.progress.dto.ProgressListDTO;
import com.example.A201.progress.dto.ProgressResultDTO;
import com.example.A201.battery.repository.BatteryRepository;
import com.example.A201.battery.service.BatteryService;
import com.example.A201.firebase.FCMNotificationRequestDto;
import com.example.A201.firebase.FCMNotificationService;
import com.example.A201.progress.repository.ProgressRepository;
import com.example.A201.history.repository.StatusHistoryRepository;
import com.example.A201.member.domain.Member;
import com.example.A201.progress.vo.MailInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

import javax.mail.internet.MimeMessage;
import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class ProgressServiceImpl implements ProgressService{

    private final AlarmService alarmService;
    private final FCMNotificationService fcmNotificationService;

    private final BatteryRepository batteryRepository;
    private final ProgressRepository progressRepository;
    private final StatusHistoryRepository statusHistoryRepository;
    private final JavaMailSender javaMailSender;
    @Value("${bms.url}")
    private String bmsurl;

    @Override
    @Transactional
    public ProgressIdDTO registerRequestProgress(ProgressDTO progressdto){

        Battery battery = batteryRepository.findByCode(progressdto.getCode())
                .orElseThrow(() -> new EntityNotFoundException("해당 배터리를 찾을 수 없습니다"));

        if(battery.getBatteryStatus() != BatteryStatus.Normal){
            throw new RuntimeException("해당 배터리 요청이 이뤄지고 있습니다.");
        }

        Progress progress = Progress.builder()
                        .battery(battery)
                        .currentStatus(ProgressStatus.Request)
                        .reason(progressdto.getReason())
                        .build();
        progressRepository.save(progress);

//        statusHistoryRepository.save(StatusHistory.builder()
//                .toStatus(Status.Request)
//                .fromStatus(battery.getBatteryStatus())
//                .battery(battery)
//                .requestReason(progress.getReason())
//                .build());
        battery.setBatteryStatus(BatteryStatus.InProgress);

        log.debug("여기까지 완료");
        log.debug("PROGRESS뜯어보기: "+progressdto.getId()+" "+progressdto.getCode()+" "+progressdto.getTitle()+" "+progressdto.getReason());
        log.debug("ID 뭐야!:"+ progressdto.getId());
        alarmService.insertAlarm(AlarmDto.builder()
                .title(progressdto.getTitle())
                .content(progressdto.getReason())
                .member(progressdto.getId())
                .build());
        log.debug("여기까지 완료22");
        fcmNotificationService.sendNotificationByToken(FCMNotificationRequestDto.builder()
                .title(progressdto.getTitle())
                .body(progressdto.getReason())
                .targetUserId(progressdto.getId())
                .receiver(Receiver.fromReceiver(Title.fromTitle(progressdto.getTitle()).getTo()))
                .build());

        return new ProgressIdDTO(progress);
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
    public MailInfo progressResult(Long progressId, ProgressResultDTO resultDto){

        Progress progress = progressRepository.findById(progressId)
                .orElseThrow(() -> new EntityNotFoundException("해당 반품 요청을 찾을 수 없습니다"));

        Battery battery = progress.getBattery();
        Member member = battery.getMember();


//        StatusHistory statusHistory = statusHistoryRepository.findByExpertStatusAndBatteryId(resultDto.getResultStatus(), battery.getId());
//        statusHistory.setFromStatus(ProgressStatus.Request);
//        statusHistory.setToStatus(p.getCurrentProgressStatus());
//        statusHistory.setExpertStatus(resultDto.getResultStatus());
//        statusHistory.setResponseReason(resultDto.getResponseReason());
//        statusHistoryRepository.save(statusHistory);

        statusHistoryRepository.save(StatusHistory.builder()
                .expertStatus(resultDto.getResultStatus())
                .battery(battery)
                .requestReason(progress.getReason())
                .responseReason(resultDto.getResponseReason())
                .build());
//        statusHistoryRepository.save(StatusHistory.builder()
//                .toStatus(progress.getToStatus())
//                .fromStatus(battery.getBatteryStatus())
//                .battery(battery)
//                .requestReason(p.getReason())
//                .responseReason(progress.getResponseReason())
//                .build());

        String reason;
        if(resultDto.getResponseReason() == null) reason = resultDto.getRequestReason();
        else reason = resultDto.getResponseReason();

//        Long memberId = batteryService.getMemberId(progress.getBatteryId());

        alarmService.insertAlarm(AlarmDto.builder()
                .title(resultDto.getResultStatus().equals("SdiFault")?"반송 수락":"반송 거절")
                .content(reason)
                .member(member.getMemberId())
                .build());
        log.debug("여기까지 완료");
        fcmNotificationService.sendNotificationByToken(FCMNotificationRequestDto.builder()
//                .title(String.valueOf(progress.getToStatus()))
                .title(String.valueOf(resultDto.getResultStatus()))
                .body(reason)
                .targetUserId(member.getMemberId())
                .receiver(Receiver.fromReceiver("일반 사용자"))
                .build());

        battery.setBatteryStatus(BatteryStatus.Analysis);
        progress.changeStatus(ProgressStatus.Expert);
        return MailInfo.builder()
                .email(member.getEmail())
                .code(battery.getCode())
                .result(resultDto.getResultStatus().toString())
                .build();
    }

    @Async
    public void sendMail(String email, String code, String result){
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
            mimeMessageHelper.setTo(email); // 메일 수신자
            mimeMessageHelper.setSubject(code + " 배터리 반송 건에 대하여"); // 메일 제목
            mimeMessageHelper.setText(String.format("%s 배터리의 분석 결과 %s", code, result)); // 메일 본문 내용, HTML 여부
            javaMailSender.send(mimeMessage);
        } catch (Exception e) {
            log.info("메일 전송 오류");
        }
    }

    public void requestToBMS(ProgressIdDTO progressIdDTO){
        try {
            WebClient webClient = WebClient.builder().baseUrl(bmsurl).build();
            webClient
                    .post()
                    .uri(uriBuilder -> uriBuilder.path("/api/bms/upload").build())
                    .bodyValue(progressIdDTO)
                    .retrieve()
                    .bodyToMono(Object.class)
                    .block();
        } catch (Exception e){
            e.printStackTrace();
        }

    }
}
