package com.batteryalmighty.bms.repository;

import com.batteryalmighty.bms.domain.BmsBoard;
import com.batteryalmighty.bms.domain.VitBoard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BmsBoardRepository extends JpaRepository<BmsBoard, Long> {
}
