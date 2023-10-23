package com.example.A201.returning.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Status {
    Reject("Reject", "반송 반려"),
    Request("Request", "반송 신청"),
    Collection("Collection", "데이터 수집"),
    Analysis("Analysis", "데이터 분석"),
    Result("Result", "분석 결과"),
    Process("Process", "반송 처리");

    private final String key;
    private final String title;
}