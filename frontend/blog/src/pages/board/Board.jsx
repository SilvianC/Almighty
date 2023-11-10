import React from "react";
import styled from "styled-components";
import BatteryBoard from "./BatteryBoard";
import ChatComponent from "../../components/chatbot/ChatComponent";
import RegisterReason from "../../components/analysis/RegistReason";
import BMSData from "../../components/analysis/BMSdata";
import AnalysisResult from "../../components/analysis/AnalysisResult";
import RegistResult from "../../components/analysis/RegistResult";
import { BiLineChart } from "react-icons/bi";
import { useRecoilValue } from "recoil";
import { IsLoginState } from "../../states/states";
import FirebaseComponent from "../../config/firebase-messaging-sw";
import SideBar from "../../components/sidebar/Sidebar";
const Board = () => {
  FirebaseComponent();

  return (
    <S.Wrap>
      <SideBar></SideBar>
      <RegisterReason></RegisterReason>
      <S.Data>
        <S.Graph>
          {/* <BiLineChart></BiLineChart> */}
          <BatteryBoard></BatteryBoard>
        </S.Graph>
      </S.Data>
      <S.Container>
        <BMSData></BMSData>
        <AnalysisResult></AnalysisResult>
        <RegistResult progressId={6}></RegistResult>
        <ChatComponent />
      </S.Container>
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div``,
  Data: styled.div`
    display: flex;
    flex-direction: row;
  `,
  Container: styled.div`
    display: flex;
    flex-direction: column;
  `,
  Graph: styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
  `,
};

export default Board;
