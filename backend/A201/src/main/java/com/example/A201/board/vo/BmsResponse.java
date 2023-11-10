package com.example.A201.board.vo;

import com.example.A201.board.domain.BmsBoard;
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
public class BmsResponse {
    int overVoltageCount;

    int underVoltageCount;

    int overCurrentCount;

    int abnormalTemperatureCount;

    public static BmsResponse bmsResponse(BmsBoard bmsBoard){
        return BmsResponse.builder()
//                .abnormalTemperatureCount(bmsBoard.getAbnormalTemperatureCount())
                .overCurrentCount(bmsBoard.getOverCurrentCount())
                .overVoltageCount(bmsBoard.getOverVoltageCount())
                .underVoltageCount(bmsBoard.getUnderVoltageCount())
                .build();
    }
}
