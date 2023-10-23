import React, { useState } from 'react';
import axios from 'axios';
import { useRecoilValue } from "recoil";
import { MemberIdState } from "../../states/states";
import http from '../../api/http';
import styled from "styled-components";
const ChatComponent = () => {
    const [message, setMessage] = useState(''); // 사용자가 입력하는 메시지
    const [chatLog, setChatLog] = useState([]); // 채팅 로그
    const memberId = useRecoilValue(MemberIdState);

    const sendMessage = async () => {
        try {
            const response = await http.post('/api/chat/interact', {
                userMessage: message,
                memberId : memberId
            });
            setChatLog([...chatLog, { user: 'You', message: message }, { user: 'Bot', message: response.data.botResponse }]);
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <S.MainContent>
        <div>
            <div className="chat-box">
                {chatLog.map((entry, index) => (
                    <div key={index}>
                        <strong>{entry.user}:</strong> {entry.message}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
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
export default ChatComponent;