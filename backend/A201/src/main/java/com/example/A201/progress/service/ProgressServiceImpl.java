package com.example.A201.progress.service;

import com.example.A201.alarm.domain.constant.Receiver;
import com.example.A201.alarm.domain.constant.Title;
import com.example.A201.alarm.dto.AlarmDto;
import com.example.A201.alarm.service.AlarmService;
import com.example.A201.battery.constant.BatteryStatus;
import com.example.A201.history.constant.ResultStatus;
import com.example.A201.progress.constant.ProgressStatus;
import com.example.A201.battery.domain.Battery;
import com.example.A201.progress.domain.Progress;
import com.example.A201.history.domain.StatusHistory;
import com.example.A201.progress.dto.ProgressDTO;
import com.example.A201.progress.dto.ProgressIdDTO;
import com.example.A201.progress.dto.ProgressListDTO;
import com.example.A201.progress.dto.ProgressResultDTO;
import com.example.A201.battery.repository.BatteryRepository;
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
                        .currentStatus(ProgressStatus.Init)
                        .reason(progressdto.getReason())
                        .build();

        progressRepository.save(progress);

        battery.setBatteryStatus(BatteryStatus.InProgress);
//        statusHistoryRepository.save(StatusHistory.builder()
//                .toStatus(Status.Request)
//                .fromStatus(battery.getBatteryStatus())
//                .battery(battery)
//                .requestReason(progress.getReason())
//                .build());

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
//        requestToBMS(battery, progress);
        return new ProgressIdDTO(progress.getId(), battery.getId(), progressdto.getCode());
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
        ResultStatus resultStatus = resultDto.getResultStatus();


//        StatusHistory statusHistory = statusHistoryRepository.findByExpertStatusAndBatteryId(resultDto.getResultStatus(), battery.getId());
//        statusHistory.setFromStatus(ProgressStatus.Request);
//        statusHistory.setToStatus(p.getCurrentProgressStatus());
//        statusHistory.setExpertStatus(resultDto.getResultStatus());
//        statusHistory.setResponseReason(resultDto.getResponseReason());
//        statusHistoryRepository.save(statusHistory);

        statusHistoryRepository.save(StatusHistory.builder()
                .expertStatus(resultStatus)
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
                .title(resultStatus.equals(ResultStatus.SdiFault)?"반송 수락":"반송 거절")
                .content(reason)
                .member(member.getMemberId())
                .build());
        log.debug("여기까지 완료");
        fcmNotificationService.sendNotificationByToken(FCMNotificationRequestDto.builder()
//                .title(String.valueOf(progress.getToStatus()))
                .title(String.valueOf(resultStatus))
                .body(reason)
                .targetUserId(member.getMemberId())
                .receiver(Receiver.fromReceiver("일반 사용자"))
                .build());

        if(resultStatus.equals(ResultStatus.SdiFault)){
            battery.setBatteryStatus(BatteryStatus.Return);
        }
        else {
            battery.setBatteryStatus(BatteryStatus.Normal);
        }

        progress.changeStatus(ProgressStatus.Expert);
        return MailInfo.builder()
                .email(member.getEmail())
                .code(battery.getCode())
                .result(resultStatus.toString())
                .build();
    }

    @Async
    public void sendMail(String email, String code, String result){
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
            mimeMessageHelper.setTo(email); // 메일 수신자
            mimeMessageHelper.setSubject(code + " 배터리 반송 건에 대하여"); // 메일 제목
            String content = null;
            String type = null;
            if(result.equals(ResultStatus.Normal.toString())){
                type = "정상";
                content = "다시 한 번 확인 후 같은 현상이 반복된다면 연락부탁드립니다.";
            } else if (result.equals(ResultStatus.SdiFault.toString())) {
                type = "제품 결함";
                content = "제품 이용에 불편을 드려 죄송합니다.<br/>빠른 시일 내에 배터리 교체를 위해 연락드리겠습니다.";
            } else if (result.equals(ResultStatus.CustomerFault.toString())) {
                type = "연결 이상";
                content = "제품의 연결 상태와 보관 상태를 확인해 주시기 바랍니다.<br/>다시 한 번 확인 후 같은 현상이 반복된다면 연락부탁드립니다.";
            }

            String html =
                    String.format("<!DOCTYPE html>\n" +
                    "<html lang=\"en\">\n" +
                    "<head>\n" +
                    "    <meta charset=\"UTF-8\">\n" +
                    "    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n" +
                    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                    "    <title>Your Email Subject</title>\n" +
                    "    <style>\n" +
                    "        body {\n" +
                    "            font-family: 'Arial', sans-serif;\n" +
                    "            line-height: 1.6;\n" +
                    "            color: #333;\n" +
                    "            background-color: #f4f4f4;\n" +
                    "            margin: 0;\n" +
                    "            padding: 0;\n" +
                    "        }\n" +
                    "        .container {\n" +
                    "            max-width: 600px;\n" +
                    "            margin: 20px auto;\n" +
                    "            background-color: #fff;\n" +
                    "            padding: 20px;\n" +
                    "            border-radius: 5px;\n" +
                    "            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n" +
                    "        }\n" +
                    "        h1, p {\n" +
                    "            margin-bottom: 20px;\n" +
                    "        }\n" +
                    "        .signature {\n" +
                    "            margin-top: 40px;\n" +
                    "            font-style: italic;\n" +
                    "            color: #888;\n" +
                    "        }\n" +
                    "    </style>\n" +
                    "</head>\n" +
                    "<body>\n" +
                    "    <div class=\"container\">\n" +
                    "        <h1>요청하신 배터리 분석 결과를 알려드립니다.</h1>\n" +
                    "        <p>%s의 분석 결과 %s으로 확인 되었습니다.</p>\n" +
                    "        <p>%s</p>\n" +
                    "        <p>감사합니다.</p>\n" +
                    "        <div class=\"signature\">\n" +
                    "            <img src='https://www.batteryalmighty.co.kr/static/media/sdilogo.ea7cb21ee752a072f2db.png' width='100px' height='30px'>\n" +
                    "        </div>\n" +
                    "    </div>\n" +
                    "</body>\n" +
                    "</html>", code, type, content);
//            mimeMessageHelper.setText(String.format("%s 배터리의 분석 결과 %s으로 확인되었습니다. %s", code, type, content), true); // 메일 본문 내용, HTML 여부
            mimeMessageHelper.setText(String.format("%s", html), true); // 메일 본문 내용, HTML 여부

            javaMailSender.send(mimeMessage);
        } catch (Exception e) {
            log.info("메일 전송 오류");
        }
    }

    //@Async
    @Override
    @Transactional
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

        Battery battery = batteryRepository.findById(progressIdDTO.getBatteryId())
                .orElseThrow(() -> new EntityNotFoundException("해당하는 배터리를 찾을 수 없습니다."));
        Progress progress = progressRepository.findById(progressIdDTO.getProgressId())
                .orElseThrow(() -> new EntityNotFoundException("해당하는 분석 요청을 찾을 수 없습니다."));

        battery.setBatteryStatus(BatteryStatus.Analysis);
        progress.changeStatus(ProgressStatus.Request);
    }
}
