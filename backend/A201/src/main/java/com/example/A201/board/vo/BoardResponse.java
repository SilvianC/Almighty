package com.example.A201.board.vo;

import com.example.A201.battery.vo.BatteryDataResponse;
import com.example.A201.progress.vo.ProgressResponse;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BoardResponse {
    private BmsResponse bmsData;
    private List<VitResponse> vitData = new ArrayList<>();
    private BatteryDataResponse battery;
    private ProgressResponse progress;
    public static BoardResponse boardResponse(BmsResponse bmsResponse, List<VitResponse> vitResponse, BatteryDataResponse batteryResponse, ProgressResponse progressResponse){
        return BoardResponse.builder()
                .bmsData(bmsResponse)
                .vitData(vitResponse)
                .battery(batteryResponse)
                .progress(progressResponse)
                .build();
    }
}
