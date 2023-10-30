package com.example.A201.alarm.domain.constant;

import lombok.Getter;

import java.util.Arrays;

@Getter
public enum Title {
    RETURN("반송 신청","관리자"),RETURNACCEPT("반송 수락", "유저"), RETURNREJECTION("반송 거절","유저");

    private final String title;
    private final String to;

    Title(String title,String to){
        this.title = title;
        this.to = to;
    }

    public static Title fromTitle(String title){
        return Arrays.stream(Title.values())
                .filter(t -> t.getTitle().equals(title))
                .findAny()
                .orElseThrow(() -> new IllegalArgumentException(String.format("타이틀 %s가 없습니다.",title)));
    }
}
