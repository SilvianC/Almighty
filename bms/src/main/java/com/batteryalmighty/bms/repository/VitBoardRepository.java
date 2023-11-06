package com.batteryalmighty.bms.repository;

import com.batteryalmighty.bms.domain.mongo.VitBoard;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VitBoardRepository extends MongoRepository<VitBoard, Long> {
}
