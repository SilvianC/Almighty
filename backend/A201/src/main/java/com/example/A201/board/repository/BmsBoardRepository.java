package com.example.A201.board.repository;

import com.example.A201.board.domain.BmsBoard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BmsBoardRepository extends JpaRepository<BmsBoard,Long> {
}
