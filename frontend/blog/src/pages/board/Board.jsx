import React, { useState } from "react";
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
  const [progress, setProgress] = useState(null);
  const [progressData, setProgressData] = useState(null);

  FirebaseComponent();

  return (
    <S.Wrap>
      <SideBar progress={progress} setProgress={setProgress}></SideBar>
      <RegisterReason
        progressData={progressData}
        setProgressData={setProgressData}
      ></RegisterReason>
      <S.Data>
        <S.Graph>
          {/* <BiLineChart></BiLineChart> */}
          <BatteryBoard
            progressId={progress}
            setProgress={setProgress}
            progressData={progressData}
            setProgressData={setProgressData}
          ></BatteryBoard>
        </S.Graph>
      </S.Data>
      <S.Container>
        <BMSData></BMSData>
        <AnalysisResult></AnalysisResult>
        <RegistResult
          progress={progress}
          setProgress={setProgress}
        ></RegistResult>
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
