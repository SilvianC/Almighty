import React from "react";
import styled from "styled-components";
import BatteryBoard from "./BatteryBoard";
import ChatComponent from "../../components/chatbot/ChatComponent";
import RegisterReason from "../../components/analysis/RegistReason";
import BMSData from "../../components/analysis/BMSdata";
import AnalysisResult from "../../components/analysis/AnalysisResult"
import RegistResult from "../../components/analysis/RegistResult"
import { BiLineChart } from "react-icons/bi";
import { useRecoilValue } from "recoil";
import { IsLoginState } from "../../states/states";
import FirebaseComponent from "../../config/firebase-messaging-sw";

const Board = () => {

  FirebaseComponent();
  
  return (
    <S.Container>
      <S.Title>
        <BiLineChart></BiLineChart>측정 데이터
      </S.Title>
      <BatteryBoard></BatteryBoard>
      <RegisterReason></RegisterReason>
      <BMSData></BMSData>
      <AnalysisResult></AnalysisResult>
      <RegistResult></RegistResult>
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
