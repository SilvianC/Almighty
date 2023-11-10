package com.batteryalmighty.bms.processing;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
class BmsProcessingTest {

    @Autowired
    BmsProcessing bmsProcessing;

    @Transactional
    @Test
    void getEkf(){
        bmsProcessing.predict();
    }
}