import React, { useState, useEffect } from 'react';
import { useRecoilValue } from "recoil";
import { MemberIdState } from "../../states/states";
import http from '../../api/http';
import styled from "styled-components";

const ChatComponent = () => {
    const [botResponse, setBotResponse] = useState('');
    const memberId = useRecoilValue(MemberIdState);

    useEffect(() => {
        getBotResponse();
    }, []); // 빈 의존성 배열을 사용하여 컴포넌트 마운트 시 한 번만 실행됩니다.

    const getBotResponse = async () => {
        try {
            // progressId는 상황에 맞게 설정해야 합니다.
            const progressId = 6; 
            const response = await http.post(`/api/chat/interact/${progressId}`, {
                timestamp: new Date(), // 현재 시간을 사용
                memberId: memberId,
                progressId: progressId
            });
            setBotResponse(response.data.botResponse);
        } catch (error) {
            console.error('Error getting response:', error);
        }
    };
    // 개행 문자를 <br />로 변환하고 단어에 따라 색상을 지정
    const formatResponse = (response) => {
        const responseLines = response.split('\n');
        let backgroundColor = 'white'; // 기본 배경색
        let color = 'black'; // 기본 색상
        if (responseLines[0].includes('불량')) {
            backgroundColor = 'pink'; // '불량'일 경우 배경색
            color = 'red';
        } else if (responseLines[0].includes('정상')) {
            backgroundColor = 'lightblue'; // '정상'일 경우 배경색
            color = 'blue';
        }

        const formattedResponse = responseLines.map((line, index) => (
            <span key={index}>{line}<br /></span>
        ));

        return <ResponseWrapper backgroundColor={backgroundColor} style={{ color: color }}>{formattedResponse}</ResponseWrapper>;
    };

    return (
        <S.MainContent>
            <div>
                {botResponse && (
                    <div>
                        <strong>Bot Response:</strong> {formatResponse(botResponse)}
                    </div>
                )}
            </div>
        </S.MainContent>
    );
};

const S = {
    MainContent: styled.div`
        padding-top: 60px; // 상단 navbar의 높이만큼 패딩을 줍니다.
        padding-left: 100px; // 왼쪽 navbar의 너비만큼 패딩을 줍니다.
    `,
};
// 새로운 styled 컴포넌트로 ResponseWrapper 정의
const ResponseWrapper = styled.div`
    background-color: ${props => props.backgroundColor};
    padding: 10px;
    margin: 10px 0;
    border-radius: 8px;
`;
export default ChatComponent;
