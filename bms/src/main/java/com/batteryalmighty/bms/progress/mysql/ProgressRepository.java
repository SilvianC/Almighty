package com.batteryalmighty.bms.progress.mysql;

import com.batteryalmighty.bms.progress.domain.Progress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProgressRepository extends JpaRepository<Progress, Long> {
}
