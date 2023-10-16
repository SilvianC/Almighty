package com.example.A201.board.vo;

import com.example.A201.board.domain.Metadata;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MetadataResponse {
    private Long id;
    private String type;
    private Integer ambientTemperature;
    private Long testId;
    private Double capacity;
    private Double re;
    private Double rct;

    public static MetadataResponse MetadataResponse(Metadata metadata){
        return MetadataResponse.builder()
                .id(metadata.getId())
                .type(metadata.getType())
                .ambientTemperature(metadata.getAmbientTemperature())
                .testId(metadata.getTestId())
                .capacity(metadata.getCapacity())
                .re(metadata.getRe())
                .rct(metadata.getRct())
                .build();
    }

}
