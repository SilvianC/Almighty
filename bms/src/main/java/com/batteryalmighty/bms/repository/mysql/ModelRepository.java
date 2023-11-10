package com.batteryalmighty.bms.repository.mysql;

import com.batteryalmighty.bms.domain.mysql.Model;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ModelRepository extends JpaRepository<Model, Long> {
}
