package com.example.A201.firebase;

import com.example.A201.alarm.domain.constant.Receiver;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FCMNotificationRequestDto {
    private Long targetUserId;
    private String title;
    private String body;
    private Receiver receiver;


}
