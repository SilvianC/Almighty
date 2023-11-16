package com.example.A201.alarm.repository.querydsl;

import com.example.A201.alarm.domain.Alarm;
import com.example.A201.alarm.domain.constant.Receiver;
import com.example.A201.alarm.vo.AlarmResponse;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.stream.Collectors;

import static com.example.A201.alarm.domain.QAlarm.alarm;

@RequiredArgsConstructor
public class AlarmRepositoryCustomImpl implements AlarmRepositoryCustom {
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Page<AlarmResponse> getAlarm(Long memberId, String status, Pageable pageable) {
        List<Alarm> fetch = jpaQueryFactory.selectFrom(alarm)
                .where(alarm.receiver.eq(Receiver.fromReceiver(status))
                        , qtnUserEq(memberId))
                .orderBy(alarm.createdDate.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        int count = jpaQueryFactory.selectFrom(alarm)
                .where(alarm.receiver.eq(Receiver.fromReceiver(status))
                        , qtnUserEq(memberId))
                .fetch().size();

        List<AlarmResponse> collect = fetch.stream()
                .map(f -> AlarmResponse.alarmResponse(f))
                .collect(Collectors.toList());

        return new PageImpl<>(collect,pageable, count);
    }
    private BooleanExpression qtnUserEq(Long memberId) {
        return memberId == null ? null : alarm.member.memberId.eq(memberId);
    }
}
