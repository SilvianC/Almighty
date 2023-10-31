package com.example.A201.battery.repository;

import com.example.A201.battery.domain.StatusHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StatusHistoryRepository extends JpaRepository<StatusHistory,Long> {
    @Query("select s from StatusHistory s join fetch s.batteryId b where s.batteryId.id=:batteryId order by s.date desc")
    List<StatusHistory> findByBatteryId(Long batteryId);

    @Query("select s from StatusHistory s join fetch s.batteryId b join b.member m where m.memberId =:memberId order by s.date desc")
    List<StatusHistory> findAllByMember(@Param("memberId") Long memberId);

    StatusHistory save(StatusHistory statusHistory);
}
