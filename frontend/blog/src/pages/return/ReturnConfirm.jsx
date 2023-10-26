import React from "react";
import styled from "styled-components";
import { BsPencilSquare } from "react-icons/bs";
import ReturnConfirmTable from "../../components/table/ReturnConfirmTable";
import AlarmTable from "../../components/alarm/AlarmTable";

const ReturnConfirm = () => {
    return (
        <S.Container>
            <S.Title>
                <BsPencilSquare />
                반품 확인 페이지
            </S.Title>
            <S.Content>
                <S.AlarmWrapper>
                    <AlarmTable />
                </S.AlarmWrapper>
                <S.ReturnWrapper>
                    <ReturnConfirmTable />
                </S.ReturnWrapper>
            </S.Content>
        </S.Container>
    );
};

export default ReturnConfirm;

const S = {
    Container: styled.div`
        height: 100vh; // 전체 높이를 뷰포트 높이로 설정
        display: flex;
        flex-direction: column; // 수직 방향으로 컴포넌트 배치
        `,
    Title: styled.div`
        font-size: 30px;
        font-weight: bold;
        color: #1428a0;
    `,
    Content: styled.div`
        display: flex;  // Flexbox를 활성화
        justify-content: space-between; // 컴포넌트들 사이에 간격을 줍니다.
    `,
    AlarmWrapper: styled.div`
        flex: 1; // 비율을 1로 설정 (즉, 전체 너비의 50% 차지)
        margin-right: 10px; // 오른쪽에 약간의 간격을 줍니다.
    `,
    ReturnWrapper: styled.div`
        flex: 2; // 비율을 2로 설정 (즉, 전체 너비의 50% 차지)
    `,
};