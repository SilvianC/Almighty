package com.batteryalmighty.bms.board.mysql;

import com.batteryalmighty.bms.board.domain.BmsBoard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BmsBoardRepository extends JpaRepository<BmsBoard,Long> {
    Optional<BmsBoard> findByProgressId(Long progressId);
}
