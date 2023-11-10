package com.batteryalmighty.bms.repository.mysql;

import com.batteryalmighty.bms.domain.mysql.Battery;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BatteryRepository extends JpaRepository<Battery, Long> {
}
