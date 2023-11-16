package com.example.A201.battery.repository;

import com.example.A201.battery.domain.Model;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ModelRepository extends JpaRepository<Model,Long> {
    Optional<Model> findByModelName(String modelName);

}
