package com.example.A201.battery.repository;

import com.example.A201.battery.domain.StatusHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StatusHistoryRepository extends JpaRepository<StatusHistory,Long> {
    @Query("select s from StatusHistory s where s.batteryId.id=:batteryId order by s.date desc")
    List<StatusHistory> findByBatteryId(Long batteryId);

    StatusHistory save(StatusHistory statusHistory);
}
