package com.example.A201.board.repository;

import com.example.A201.board.domain.VitBoard;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface VitBoardRepository extends MongoRepository<VitBoard, String> {
    List<VitBoard> findVitBoardByProgressId(Long progressId);
}
