package com.example.A201.battery.repository;

import com.example.A201.battery.domain.Battery;
import com.example.A201.battery.domain.StatusHistory;
import com.example.A201.member.domain.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StatusHistoryRepository extends JpaRepository<StatusHistory,Long> {
    @Query("select s from StatusHistory s join fetch s.batteryId b where s.batteryId.id=:batteryId order by s.date desc")
    List<StatusHistory> findByBatteryId(Long batteryId);

    @Query("select s from StatusHistory s join s.batteryId b join b.member m where m.memberId=:memberId order by s.date desc")
    Page<StatusHistory> findAllByMember(@Param("memberId") Long memberId, Pageable pageable);

    @Query("select s from StatusHistory s order by s.date desc")
    Page<StatusHistory> findAll(Pageable pageable);

    StatusHistory save(StatusHistory statusHistory);
}
