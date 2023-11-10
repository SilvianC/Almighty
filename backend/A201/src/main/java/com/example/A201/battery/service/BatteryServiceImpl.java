package com.example.A201.battery.service;

import com.example.A201.alarm.domain.Alarm;
import com.example.A201.alarm.dto.AlarmDto;
import com.example.A201.alarm.repository.AlarmRepository;
import com.example.A201.battery.constant.Status;
import com.example.A201.battery.domain.Battery;
import com.example.A201.battery.domain.Progress;
import com.example.A201.battery.domain.StatusHistory;
import com.example.A201.battery.dto.ProgressDTO;
import com.example.A201.battery.dto.ProgressListDTO;
import com.example.A201.battery.dto.ProgressResultDTO;
import com.example.A201.battery.repository.BatteryRepository;
import com.example.A201.battery.repository.ProgressRepository;
import com.example.A201.battery.repository.StatusHistoryRepository;
import com.example.A201.battery.vo.BatteryResponse;
import com.example.A201.battery.vo.BatterydataResponse;
import com.example.A201.exception.CustomException;
import com.example.A201.member.domain.Member;
import com.example.A201.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.example.A201.exception.ErrorCode.USER_NOT_FOUND;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BatteryServiceImpl implements BatteryService{

    private final BatteryRepository batteryRepository;
    private final ProgressRepository progressRepository;
    private final StatusHistoryRepository statusHistoryRepository;
    private final JavaMailSender javaMailSender;
    private final MemberRepository memberRepository;
    private final AlarmRepository alarmRepository;
    @Override
    public List<BatteryResponse> getBatteriesAll() {
        List<Battery> batteries = batteryRepository.findAll();
        return batteries.stream().map(battery -> BatteryResponse.batteryResponse(battery)).collect(Collectors.toList());
    }
    @Override
    public BatterydataResponse getBattery(String code){
        return batteryRepository.findByCode(code).map(battery -> BatterydataResponse.batteryResponse(battery))
                .orElseThrow(() -> new IllegalStateException("해당 배터리를 찾을 수 없습니다"));
    }

    @Override
    @Transactional
    public Battery updateBatteryStatue(Long batteryId, Status status) {
        Optional<Battery> battery = batteryRepository.findById(batteryId);
        battery.get().setBatteryStatus(status);
        return batteryRepository.save(battery.get());
    }

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

    @Override
    @Transactional
    public void registProgress(ProgressDTO progress){
        Battery battery = batteryRepository.findByCode(progress.getCode()).orElseThrow(
                () -> new EntityNotFoundException("해당 배터리를 찾을 수 없습니다")
        );

        progressRepository.save(Progress.builder().batteryId(battery).currentStatus(Status.Request).reason(progress.getReason()).build());
        statusHistoryRepository.save(StatusHistory.builder()
                .toStatus(Status.Request)
                .fromStatus(battery.getBatteryStatus())
                .batteryId(battery)
                .requestReason(progress.getReason())
                .build());
        battery.setBatteryStatus(Status.Request);

        AlarmDto alarmDto = AlarmDto.builder()
                .title(progress.getTitle())
                .content(progress.getReason())
                .member(progress.getId())
                .build();
        Member member = memberRepository.findById(progress.getId()).orElseThrow(() ->
                new CustomException(USER_NOT_FOUND));
        Alarm entity = Alarm.toEntity(alarmDto, member);
        alarmRepository.save(entity);

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
        Battery battery = p.getBatteryId();
        Member member = battery.getMember();
        statusHistoryRepository.save(StatusHistory.builder()
                .toStatus(progress.getToStatus())
                .fromStatus(battery.getBatteryStatus())
                .batteryId(battery)
                .requestReason(p.getReason())
                .responseReason(progress.getResponseReason())
                .build());
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
