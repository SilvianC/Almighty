package com.example.A201.board.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor()
@AllArgsConstructor
public class MetadataResponse {
    private Long id;
    private String type;

    private Integer ambientTemperature;
    private Long testId;

    private Double capacity;
    private Double re;
    private Double rct;

}
