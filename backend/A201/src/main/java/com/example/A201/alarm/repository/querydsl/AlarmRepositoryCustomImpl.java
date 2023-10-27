package com.example.A201.alarm.repository.querydsl;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class AlarmRepositoryCustomImpl implements AlarmRepostitoryCustom{
    private final JPAQueryFactory jpaQueryFactory;

}
