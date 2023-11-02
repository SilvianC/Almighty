package com.example.A201.board.repository;

import com.example.A201.board.domain.VitBoard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VitBoardRepository extends JpaRepository<VitBoard, Long> {
}
