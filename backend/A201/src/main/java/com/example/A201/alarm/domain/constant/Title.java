package com.example.A201.alarm.domain.constant;

import lombok.Getter;

import java.util.Arrays;

@Getter
public enum Title {
    RETURN("반송 신청","유저"),RETURNRECEIVE("반송 신청","관리자")
    ,RETURNACCEPT("반송 수락", "관리자"), RETURNREJECTION("반송 거절","관리자");

    private final String title;
    private final String role;

    Title(String title,String role){
        this.title = title;
        this.role = role;
    }

    public static Title fromTitle(String title){
        return Arrays.stream(Title.values())
                .filter(t -> t.getTitle().equals(title))
                .findAny()
                .orElseThrow(() -> new IllegalArgumentException(String.format("타이틀 %s가 없습니다.",title)));
    }
}
