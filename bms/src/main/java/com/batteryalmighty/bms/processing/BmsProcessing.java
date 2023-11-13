package com.batteryalmighty.bms.processing;

import com.batteryalmighty.bms.board.service.Ekf;
import com.batteryalmighty.bms.battery.mysql.BatteryRepository;
import com.batteryalmighty.bms.board.mysql.BmsBoardRepository;
import com.batteryalmighty.bms.vitboard.mongo.VitBoardRepository;
import com.batteryalmighty.bms.battery.mysql.ModelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.mongodb.core.MongoTemplate;

@Service
@Transactional
@RequiredArgsConstructor
public class BmsProcessing {
    private final VitBoardRepository vitBoardRepository;
    private final MongoTemplate mongoTemplate;
    private final BmsBoardRepository bmsBoardRepository;
    private final BatteryRepository batteryRepository;
    private final ModelRepository modelRepository;
    private final Ekf ekf;


}
