package com.example.A201.board.vo;

import com.example.A201.board.domain.Metadata;
import lombok.Builder;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Builder
public class TestdataResponse {
    private Double voltageMeasured;

    private Double currentMeasured;

    private Double temperatureMeasured;

    private Double currentLoad;

    private Double voltageLoad;

    private Long time;

    private String senseCurrent;

    private String batteryCurrent;

    private String currentRatio;

    private String batteryImpedance;

    private String rectifiedImpedance;
}
