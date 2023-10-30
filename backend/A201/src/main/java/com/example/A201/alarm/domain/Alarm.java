package com.example.A201.alarm.domain;

import com.example.A201.alarm.domain.constant.Receiver;
import com.example.A201.alarm.domain.constant.Title;
import com.example.A201.alarm.dto.AlarmDto;
import com.example.A201.common.BaseTime;
import com.example.A201.common.BooleanToYNConverter;
import com.example.A201.member.domain.Member;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Alarm extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "alarm_id")
    private Long id;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Title title; //
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Receiver receiver; // 받는 사람
    @Column(nullable = false)
    private String content;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    private Member member; // 보낸 사람
    @Convert(converter = BooleanToYNConverter.class)
    @Column(columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean isRead;

    public static Alarm toEntity(AlarmDto alarmDto, Member member){
        Title title = Title.fromTitle(alarmDto.getTitle());
        Receiver receiver = Receiver.fromReceiver(title.getTo());
        return Alarm.builder()
                .title(title)
                .member(member)
                .receiver(receiver)
                .content(alarmDto.getContent())
                .build();

    }

    public void updateRead(){
        this.isRead = !isRead;
    }


}
