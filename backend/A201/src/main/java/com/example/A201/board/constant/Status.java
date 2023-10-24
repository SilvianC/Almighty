package com.example.A201.board.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Status {
    Normal("Normal", "정상"),
    Request("Request", "이상 배터리 신청"),
    Upload("Upload", "데이터 RMA 업로드"),
    Analysis("Analysis", "데이터 분석 및 귀책 판단"),
    CustomerFault("CustomerFault", "고객 귀책"),
    SdiFault("SdiFault", "SDI 귀책");

    private final String key;
    private final String title;
}