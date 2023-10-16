package com.example.A201.board.repository;

import com.example.A201.board.domain.Battery;
import com.example.A201.board.domain.Metadata;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MetadataRepository extends JpaRepository<Metadata, Long> {
    List<Metadata> findByBatteryIdAndType(Battery battery, String type);

    List<Metadata> findByBatteryId(Battery battery);

}
