package com.example.A201.battery.repository;

import com.example.A201.battery.domain.Battery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BatteryRepository extends JpaRepository<Battery,Long> {
    Optional<Battery> findByCode(String code);

    @Query("select b from Battery b where b.member.memberId=:memberId order by b.code desc")
    Page<Battery> findByMember(@Param("memberId") Long memberId, Pageable pageable);

    Optional<Battery> findById(Long batteryId);

    Battery save(Battery battery);

    @Query("select b from Battery b where b.batteryStatus = 'InProgress'")
    List<Battery> findByBatteryStatus();
}
