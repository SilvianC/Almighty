package com.example.A201.board.repository;

import com.example.A201.board.domain.VitBoard;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VitBoardRepository extends JpaRepository<VitBoard, Long> {
    @Query("select distinct vit from VitBoard vit join vit.progress p where p.progressId=:progressId")
    List<VitBoard> findByProgress(@Param("progressId") Long progressId, Pageable pageable);
}
