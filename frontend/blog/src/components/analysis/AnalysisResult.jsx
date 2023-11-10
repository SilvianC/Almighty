import React, { useState, useEffect } from "react";
import styled from "styled-components";
import http from "../../api/http";
import { useRecoilValue } from "recoil";
import { MemberIdState } from "../../states/states";

const AnalysisResult = () => {
  const formatResponse = (response) => {
    const responseLines = response.split("\n");
    let backgroundColor = "white"; // 기본 배경색
    let color = "black"; // 기본 색상
    console.log(responseLines);
    if (responseLines[0].includes("불량")) {
      //   backgroundColor = "pink"; // '불량'일 경우 배경색
      color = "red";
    } else if (responseLines[0].includes("정상")) {
      //   backgroundColor = "lightblue"; // '정상'일 경우 배경색
      color = "blue";
    }

    const formattedResponse = responseLines.map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));

    return (
      <ResponseWrapper backgroundColor={backgroundColor}>
        <span style={{ color: color }}>{formattedResponse[0]}</span>
        {formattedResponse[1]}
      </ResponseWrapper>
    );
  };
  const [isLoading, setIsLoading] = useState(true);
  const [botResponse, setBotResponse] = useState("");
  const memberId = useRecoilValue(MemberIdState);
  const getBotResponse = async () => {
    try {
      // progressId는 상황에 맞게 설정해야 합니다.
      const progressId = 6;
      const response = await http.post(`/api/chat/interact/${progressId}`, {
        timestamp: new Date(), // 현재 시간을 사용
        memberId: memberId,
        progressId: progressId,
      });
      setBotResponse(response.data.botResponse);
    } catch (error) {
      console.error("Error getting response:", error);
    }
  };
  useEffect(() => {
    getBotResponse();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <S.Wrap>
      <S.Title>
        <p>분석 결과</p>
      </S.Title>

      {isLoading && <div className="loader"></div>}
      {!isLoading && <>{formatResponse(botResponse)}</>}
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div`
    width: 100%;
    background-color: #f2f2f2;
    padding: 6% 7.2% 6%;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `,
  Title: styled.div`
    width: 85.6%;
    height: 40px;

    > p {
      color: #034f9e;
      font-weight: bold;
      font-size: 25px;
      line-height: 40px;
      margin-left: 30px;
    }
  `,
  Result: styled.div`
    width: 85.6%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    > .loader {
      // display: none;
      margin: 5% auto;
      height: 100px;
      width: 100px;
      border: 6px solid #fff;
      border-right-color: #034f9e;
      border-top-color: #034f9e;
      border-radius: 100%;
      -webkit-animation: spin 800ms infinite linear;
      animation: spin 800ms infinite linear;
    }
    @-webkit-keyframes "spin" {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(359deg);
      }
    }

    @keyframes "spin" {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(359deg);
      }
    }
  `,
};
const ResponseWrapper = styled.div`
  background-color: ${(props) => props.backgroundColor};
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;
export default AnalysisResult;
