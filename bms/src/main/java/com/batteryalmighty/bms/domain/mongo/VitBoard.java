package com.batteryalmighty.bms.domain.mongo;

import com.batteryalmighty.bms.domain.mysql.Progress;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.persistence.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Document(collection = "vitboard")
public class VitBoard {

    @Transient
    public static final String SEQUENCE_NAME = "vit_sequence";

    @Id
    private String id;
    private Long idx;

    @Field(name = "Voltage_measured")
    private Double voltage;

    @Field(name = "Current_measured")
    private Double current;

    @Field(name = "Temperature_measured")
    private Double temperature;

    @Field(name = "Time")
    private Double time;

    @Field(name = "Soc")
    private Double soc;

    @Field(name = "Ekf")
    private Double ekf;

    @Field(name = "progress_id")
    private Long progressId;

    public void predictEkf(Double ekf){
        this.ekf = ekf;
    }
}
