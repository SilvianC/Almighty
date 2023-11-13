package com.batteryalmighty.bms.repository.mysql;

import com.batteryalmighty.bms.bmsboard.domain.BmsBoard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BmsBoardRepository extends JpaRepository<BmsBoard,Long> {
    Optional<BmsBoard> findByProgressId(Long progressId);
}
