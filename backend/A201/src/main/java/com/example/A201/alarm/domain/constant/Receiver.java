package com.example.A201.alarm.domain.constant;

import lombok.Getter;

import java.util.Arrays;

@Getter
public enum Receiver {
    USER("일반 사용자"),ADMIN("관리자");
    private final String role;

    Receiver(String role){
        this.role = role;
    }
    public static Receiver fromReceiver(String role){
        return Arrays.stream(Receiver.values())
                .filter(t -> t.getRole().equals(role))
                .findAny()
                .orElseThrow(() -> new IllegalArgumentException(String.format("역할 %s가 없습니다.",role)));
    }
}
