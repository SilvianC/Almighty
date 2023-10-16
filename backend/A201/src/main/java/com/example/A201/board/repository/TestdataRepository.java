package com.example.A201.board.repository;

import com.example.A201.board.domain.Testdata;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TestdataRepository extends JpaRepository<Testdata, Long> {
    @Query("select td from Testdata td join td.metadata md join md.batteryId where md.batteryId.code like :batteryCode and md.testId = :testId")
    List<Testdata> findByBatteryAndTestId(@Param("batteryCode") String batteryCode, @Param("testId")Long testId);
}
