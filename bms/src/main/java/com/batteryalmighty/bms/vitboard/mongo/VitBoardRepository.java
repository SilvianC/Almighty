package com.batteryalmighty.bms.vitboard.mongo;

import com.batteryalmighty.bms.vitboard.domain.VitBoard;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface VitBoardRepository extends MongoRepository<VitBoard, String> {
//    List<VitBoard> findTop1000VitBoardByProgressIdOrderById(Long id);
    List<VitBoard> findVitBoardByProgressId(Long progressId);
}
