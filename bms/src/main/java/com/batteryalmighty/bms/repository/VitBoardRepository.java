package com.batteryalmighty.bms.repository;

import com.batteryalmighty.bms.domain.VitBoard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VitBoardRepository extends JpaRepository<VitBoard, Long> {
    List<VitBoard> findVitBoardByProgressIdOrderById(Long id);
}
