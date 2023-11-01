package com.example.A201.battery.repository;

import com.example.A201.battery.domain.Bms;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BmsRepository  extends JpaRepository<Bms,Long> {
}
