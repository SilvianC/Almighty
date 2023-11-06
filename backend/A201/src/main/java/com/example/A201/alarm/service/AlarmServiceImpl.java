package com.example.A201.alarm.service;

import com.example.A201.alarm.domain.Alarm;
import com.example.A201.alarm.domain.constant.Receiver;
import com.example.A201.alarm.dto.AlarmDto;
import com.example.A201.alarm.repository.AlarmRepository;
import com.example.A201.alarm.vo.AlarmResponse;
import com.example.A201.exception.CustomException;
import com.example.A201.member.domain.Member;
import com.example.A201.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static com.example.A201.exception.ErrorCode.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AlarmServiceImpl implements AlarmService {
    private final AlarmRepository alarmRepository;
    private final MemberRepository memberRepository;

    @Override
    @Transactional
    public void insertAlarm(AlarmDto alarmDto) {
        Member member = memberRepository.findById(alarmDto.getMember()).orElseThrow(() ->
                new CustomException(USER_NOT_FOUND));
        Alarm entity = Alarm.toEntity(alarmDto, member);
        alarmRepository.save(entity);
    }

    @Override
    public Page<AlarmResponse> getAlarm(Long id, String status, PageRequest pageRequest) {
        return alarmRepository.getAlarm(id, status, pageRequest);
    }

    @Override
    public Long countAlarm(Long id) {
        Member member = memberRepository.findById(id).orElseThrow(() ->
                new CustomException(USER_NOT_FOUND));

        return alarmRepository.countByReceiverAndMemberAndIsRead(Receiver.fromReceiver(member.getRole().getTitle()), member, false);
    }

    @Override
    @Transactional
    public void deleteAlarm(Long alarmId) {
        Optional<Alarm> alarm = alarmRepository.findById(alarmId);
        if (alarm.isPresent()) {
            alarmRepository.deleteById(alarmId);
        }
    }

    @Override
    @Transactional
    public void updateAlarm(Long id) {
        Member member = memberRepository.findById(id).orElseThrow(() ->
                new CustomException(USER_NOT_FOUND));
        alarmRepository.updateAlarm(member, Receiver.fromReceiver(member.getRole().getTitle()));
    }
}
