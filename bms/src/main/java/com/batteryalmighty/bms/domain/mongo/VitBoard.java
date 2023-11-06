package com.batteryalmighty.bms.domain.mongo;

import com.batteryalmighty.bms.domain.mysql.Progress;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.persistence.*;

@Document(collection = "vitboard")
public class VitBoard {
    private String id;

    @Field(name = "Voltage_measured")
    private Double voltage;

    @Field(name = "Current_measured")
    private Double current;

    @Field(name = "Temperature_measured")
    private Double temperature;

    @Field(name = "Time")
    private Double time;

    @Field(name = "SOC")
    private Double soc;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "progress_id")
    private Progress progress;

}
