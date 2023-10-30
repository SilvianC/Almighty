package com.example.A201.firebase;

import com.example.A201.exception.CustomException;
import com.example.A201.exception.ErrorCode;
import com.example.A201.member.domain.Member;
import com.example.A201.member.domain.Role;
import com.example.A201.member.repository.MemberRepository;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class FCMNotificationService {

    private final FirebaseMessaging firebaseMessaging;
    private final RedisTemplate redisTemplate;
    private final MemberRepository memberRepository;
    @Resource(name = "redisTemplate")
    private ValueOperations<String, String> valueOperations;

    public String sendNotificationByToken(FCMNotificationRequestDto requestDto) {

        if(requestDto.getReceiver().getRole()=="유저"){
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

        }else if(requestDto.getReceiver().getRole()=="관리자"){

            List<Member> members = memberRepository.findByRole(Role.ADMIN);
            members.parallelStream()
                    .filter(member -> valueOperations.get(String.valueOf(member.getMemberId()))!=null)
                    .forEach((member) -> {
                        Notification notification = Notification.builder()
                                .setTitle(requestDto.getTitle())
                                .setBody(requestDto.getBody())
                                .build();

                        Message message = Message.builder()
                                .setToken(valueOperations.get(String.valueOf(member.getMemberId())))
                                .setNotification(notification)
                                .build();

                        try {
                            firebaseMessaging.send(message);
                        } catch (FirebaseMessagingException e) {
                            e.printStackTrace();
                        }
                    });

            return "알림을 보냈습니다.";

        }

        return "아무게";
    }


    public void updateFirebase(String firebaseToken, Long userId) {
        valueOperations.set(String.valueOf(userId), firebaseToken);
    }
}
