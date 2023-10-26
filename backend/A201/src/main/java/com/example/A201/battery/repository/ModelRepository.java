package com.example.A201.battery.repository;

import com.example.A201.battery.domain.Model;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ModelRepository extends JpaRepository<Model,Long> {
}
