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
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
@Slf4j
public class FCMNotificationService {

    private final FirebaseMessaging firebaseMessaging;
    private final RedisTemplate redisTemplate;
    private final MemberRepository memberRepository;
    @Resource(name = "redisTemplate")
    private ValueOperations<String, String> valueOperations;

    public String sendNotificationByToken(FCMNotificationRequestDto requestDto) {
        log.info("누구에게 보내는 메시지{}",requestDto.toString());
        System.out.println(firebaseMessaging.toString());
        if(requestDto.getReceiver().getRole()=="일반 사용자"){
            log.info("유저에게 보내는 메시지{}",requestDto.toString());
            String token = valueOperations.get(String.valueOf(requestDto.getTargetUserId()));
            if (token == null) {
                return "알림 전송 실패";
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
                        log.info("토큰값 {}",valueOperations.get(String.valueOf(member.getMemberId())));
                        Message message = Message.builder()
                                .setToken(valueOperations.get(String.valueOf(member.getMemberId())))
                                .setNotification(notification)
                                .build();

                        try {
                            firebaseMessaging.send(message);
                        } catch (Exception e) {
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
