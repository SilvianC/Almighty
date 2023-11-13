package com.batteryalmighty.bms.battery.mysql;

import com.batteryalmighty.bms.battery.domain.Battery;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BatteryRepository extends JpaRepository<Battery, Long> {
}
