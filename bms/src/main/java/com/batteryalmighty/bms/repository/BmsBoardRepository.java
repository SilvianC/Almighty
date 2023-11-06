package com.batteryalmighty.bms.repository;

import com.batteryalmighty.bms.domain.mysql.BmsBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface BmsBoardRepository extends JpaRepository<BmsBoard,Long> {
    @Query("select bms from BmsBoard bms join fetch bms.progress p where p.progressId=:progressId")
    Optional<BmsBoard> findByProgress(@Param("progressId") Long progressId);
}
