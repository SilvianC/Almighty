package com.example.A201.firebase;

import com.example.A201.exception.CustomException;
import com.example.A201.exception.ErrorCode;
import com.example.A201.member.repository.MemberRepository;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@RequiredArgsConstructor
@Service
public class FCMNotificationService {

    private final FirebaseMessaging firebaseMessaging;
    private final RedisTemplate redisTemplate;
    @Resource(name = "redisTemplate")
    private ValueOperations<String, String> valueOperations;

    public String sendNotificationByToken(FCMNotificationRequestDto requestDto) {

        String token = valueOperations.get(String.valueOf(requestDto.getTargetUserId()));
        if (token == null) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }
        Notification notification = Notification.builder()
                .setTitle(requestDto.getTitle())
                .setBody(requestDto.getBody())
                .build();

        Message message = Message.builder()
                .setToken(token)
                .setNotification(notification)
                .build();

        try {
            firebaseMessaging.send(message);
            return "알림을 성공적으로 전송했습니다. targetUserId=" + requestDto.getTargetUserId();
        } catch (FirebaseMessagingException e) {
            e.printStackTrace();
            return "알림 보내기를 실패하였습니다. targetUserId=" + requestDto.getTargetUserId();
        }

    }


    public void updateFirebase(String firebaseToken, Long userId) {
        valueOperations.set(String.valueOf(userId), firebaseToken);
    }
}
