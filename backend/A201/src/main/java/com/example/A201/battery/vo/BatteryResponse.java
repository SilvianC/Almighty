package com.example.A201.battery.vo;

import com.example.A201.battery.domain.Battery;
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
public class BatteryResponse {
    private String code;

    private Long modelId;

    private Long memberId;

    private Long Id;

    private String status;
    public static BatteryResponse batteryResponse(Battery battery){
        return BatteryResponse.builder()
                .code(battery.getCode())
                .modelId(battery.getModel().getId())
                .memberId(battery.getMember().getMemberId())
                .Id(battery.getId())
                .status(battery.getBatteryStatus().toString())
                .build();
    }
}
