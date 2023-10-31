package com.example.A201.alarm.repository;

import com.example.A201.alarm.domain.Alarm;
import com.example.A201.alarm.repository.querydsl.AlarmRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlarmRepository extends JpaRepository<Alarm,Long>, AlarmRepositoryCustom {
}
