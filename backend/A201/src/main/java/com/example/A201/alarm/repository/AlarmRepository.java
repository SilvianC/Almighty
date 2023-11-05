package com.example.A201.alarm.repository;

import com.example.A201.alarm.domain.Alarm;
import com.example.A201.alarm.domain.constant.Receiver;
import com.example.A201.alarm.repository.querydsl.AlarmRepositoryCustom;
import com.example.A201.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AlarmRepository extends JpaRepository<Alarm,Long>, AlarmRepositoryCustom {

    Long countByReceiverAndMemberAndIsRead(Receiver receiver, Member member, boolean b);
    @Modifying
    @Query(value = "update Alarm a set a.isRead=true where a.member=:member and a.receiver=:receiver and a.isRead=false")
    int updateAlarm(@Param("member") Member member,@Param("receiver") Receiver receiver);
}
