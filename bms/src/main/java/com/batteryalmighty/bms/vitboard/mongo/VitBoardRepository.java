package com.batteryalmighty.bms.repository.mongo;

import com.batteryalmighty.bms.domain.mongo.VitBoard;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface VitBoardRepository extends MongoRepository<VitBoard, String> {
//    List<VitBoard> findTop1000VitBoardByProgressIdOrderById(Long id);
    List<VitBoard> findVitBoardByProgressId(Long progressId);
}
