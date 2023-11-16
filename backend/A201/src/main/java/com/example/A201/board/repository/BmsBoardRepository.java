package com.example.A201.board.repository;

import com.example.A201.board.domain.BmsBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface BmsBoardRepository extends JpaRepository<BmsBoard,Long> {
    @Query("select distinct bms from BmsBoard bms join fetch bms.progress p join fetch p.battery b join fetch b.model where p.id=:progressId")
    Optional<BmsBoard> findByProgress(@Param("progressId") Long progressId);
}
