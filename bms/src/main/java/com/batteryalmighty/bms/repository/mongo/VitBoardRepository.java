package com.batteryalmighty.bms.repository.mongo;

import com.batteryalmighty.bms.domain.mongo.VitBoard;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VitBoardRepository extends MongoRepository<VitBoard, String> {
}
