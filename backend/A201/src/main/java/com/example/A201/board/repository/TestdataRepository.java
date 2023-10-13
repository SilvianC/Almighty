package com.example.A201.board.repository;

import com.example.A201.board.domain.Testdata;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TestdataRepository extends JpaRepository<Testdata, Long> {
    List<Testdata> findByMetadataId(Long id);
}
