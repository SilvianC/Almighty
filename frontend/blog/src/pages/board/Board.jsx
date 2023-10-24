import React from "react";
import styled from "styled-components";
import BatteryBoard from "./BatteryBoard";
import ChatComponent from "../../components/chatbot/ChatComponent";
const Board = () => {
  return (
    <S.Container>
      <S.Title>측정 데이터</S.Title>
      <BatteryBoard></BatteryBoard>
      <ChatComponent />
    </S.Container>
  );
};

const S = {
  Container: styled.div``,
  Title: styled.div`
    font-size: 30px;
    font-weight: bold;
    color: #1428a0;
    
  `,
};

export default Board;
