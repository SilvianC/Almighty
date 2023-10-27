package com.example.A201.alarm.repository;

import com.example.A201.alarm.domain.Alarm;
import com.example.A201.alarm.repository.querydsl.AlarmRepostitoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlarmRepository extends JpaRepository<Alarm,Long>, AlarmRepostitoryCustom {
}
