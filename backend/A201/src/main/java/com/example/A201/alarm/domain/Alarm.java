package com.example.A201.alarm.domain;

import com.example.A201.alarm.domain.constant.Receiver;
import com.example.A201.alarm.domain.constant.Title;
import com.example.A201.common.BaseTime;
import com.example.A201.common.BooleanToYNConverter;
import com.example.A201.member.domain.Member;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

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
    private Title title;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Receiver receiver;
    @Column(nullable = false)
    private String content;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    private Member member;
    @Convert(converter = BooleanToYNConverter.class)
    @Column(columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean isRead;

    public void updateRead(){
        this.isRead = !isRead;
    }


}
