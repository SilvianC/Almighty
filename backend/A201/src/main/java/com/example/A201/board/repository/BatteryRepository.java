package com.example.A201.board.repository;

import com.example.A201.board.domain.Battery;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BatteryRepository extends JpaRepository<Battery,Long> {
    Optional<Battery> findByCode(String code);
}
