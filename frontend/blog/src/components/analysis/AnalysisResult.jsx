import React, { useState, useEffect } from "react";
import styled from "styled-components";
import http from "../../api/http";
import { useRecoilValue } from "recoil";
import { MemberIdState } from "../../states/states";

const AnalysisResult = ({ progressId }) => {
  const formatResponse = (response) => {
    const responseLines = response.split("\n");
    let color = "#1D1F25"; // 기본 색상
    console.log(responseLines);
    if (responseLines[0].includes("불량")) {
      //   backgroundColor = "pink"; // '불량'일 경우 배경색
      color = "#D84848";
    } else if (responseLines[0].includes("정상")) {
      //   backgroundColor = "lightblue"; // '정상'일 경우 배경색
      color = "#034F9E";
    }

    const formattedResponse = responseLines.map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));

    return (
      <ResponseWrapper>
        {progressId && isLoading && <div className="loader" style={{ margin: "auto" }}></div>}
        {!isLoading && (
          <>
          <span style={{ color: color }}>{formattedResponse[0]}</span>
          <div>{formattedResponse[1]}</div>
          </>
        )}
      </ResponseWrapper>
    );
  };

  const [isLoading, setIsLoading] = useState(true);
  const [botResponse, setBotResponse] = useState("");
  const memberId = useRecoilValue(MemberIdState);
  const getBotResponse = async () => {
    try {
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
    if(progressId !== null) {
      getBotResponse();
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [progressId]);

  return (
    <S.Wrap>
      <S.Title>
        <p>분석 결과</p>
      </S.Title>
      {<>{formatResponse(botResponse)}</>}
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div`
    width: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  Title: styled.div`
    > p {
      color: #1D1F25;
      font-weight: bold;
      font-size: 18px;
	  margin: 0px;
    }
  `,
  Result: styled.div`
    width: 85.6%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    
  `,
};
const ResponseWrapper = styled.div`
  background-color: #F2F2F2;
  width: 85%;
  height: 100px;
  border-radius: 10px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0px 2.77px 2.21px rgba(0, 0, 0, 0.0197), 0px 12.52px 10.02px rgba(0, 0, 0, 0.035), 0px 20px 80px rgba(0, 0, 0, 0.07);

  > span {
    margin-left: 20px;
    font-size: 17px;
    font-weight: bold;
  }
  > div {
    margin-left: 20px;
    font-size: 17px;
    margin-top: 5px;
    margin-bottom: 0px;
    overflow: auto;
  }
  > .loader {
    height: 50px;
    width: 50px;
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
`;
export default AnalysisResult;
