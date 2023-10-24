package com.example.A201.firebase;

import com.example.A201.exception.CustomException;
import com.example.A201.exception.ErrorCode;
import com.example.A201.member.domain.Member;
import com.example.A201.member.repository.MemberRepository;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class FCMNotificationService {

    private final FirebaseMessaging firebaseMessaging;
    private final MemberRepository memberRepository;

    public String sendNotificationByToken(FCMNotificationRequestDto requestDto) {

        Member member = memberRepository.findById(requestDto.getTargetUserId()).orElseThrow(() ->
                new CustomException(ErrorCode.USER_NOT_FOUND));


        Notification notification = Notification.builder()
                .setTitle(requestDto.getTitle())
                .setBody(requestDto.getBody())
                // .setImage(requestDto.getImage())
                .build();

        Message message = Message.builder()
//                .setToken(member.getFirebaseToken())
                .setNotification(notification)
                // .putAllData(requestDto.getData())
                .build();

        try {
            firebaseMessaging.send(message);
            return "알림을 성공적으로 전송했습니다. targetUserId=" + requestDto.getTargetUserId();
        } catch (FirebaseMessagingException e) {
            e.printStackTrace();
            return "알림 보내기를 실패하였습니다. targetUserId=" + requestDto.getTargetUserId();
        }

    }


}
