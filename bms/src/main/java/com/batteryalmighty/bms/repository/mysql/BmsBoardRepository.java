package com.batteryalmighty.bms.repository.mysql;

import com.batteryalmighty.bms.domain.mysql.BmsBoard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BmsBoardRepository extends JpaRepository<BmsBoard,Long> {
}
