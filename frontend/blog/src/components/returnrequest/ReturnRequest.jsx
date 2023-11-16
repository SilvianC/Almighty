import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import http from "../../api/http";
import { ColorRing } from "react-loader-spinner";
import { useRecoilValue } from "recoil";
import { MemberIdState, AccessTokenState } from "../../states/states";

const ReturnRequest = ({ onClose, item, onSuccess, onError }) => {
  const [requestReason, setRequestReason] = useState("");
  const memberId = useRecoilValue(MemberIdState);
  const accessToken = useRecoilValue(AccessTokenState);
  const [loadingText, setLoadingText] = useState("");
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const loadingTexts = [
      "데이터를 전송하고 있습니다...",
      "BMS 데이터를 전송하고 있습니다...",
      "EKF와 SOC를 계산하고 있습니다...",
      "잠시만 기다려주세요...",
      "거의 완료되었습니다...",
    ];
    let currentIndex = 0;

    const updateText = () => {
      // 텍스트 가시성을 먼저 false로 설정하여 페이드 아웃
      if (currentIndex < loadingTexts.length) {
        setTextVisible(false);
      }

      // 텍스트를 변경하고, 페이드 인하기 전에 약간의 지연
      setTimeout(() => {
        if (currentIndex < loadingTexts.length) {
          setLoadingText(loadingTexts[currentIndex]);
          setTextVisible(true); // 페이드 인
          currentIndex++;
        }
      }, 500); // 페이드 아웃 후 텍스트 변경까지의 지연 시간
    };

    const interval = setInterval(updateText, 6000);
    if (currentIndex < loadingTexts.length) {
      updateText();
    } // 초기 텍스트 설정

    return () => clearInterval(interval);
  }, []);

  // 로딩 상태를 추적하는 상태 변수
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmission = (event) => {
    event.preventDefault();
    setIsLoading(true); // 요청 시작 시 로딩 상태를 true로 설정
    const data = {
      id: memberId,
      title: "반송 신청",
      code: item.code,
      reason: requestReason,
    };

    http
      .post("/api/batteries/progress/request", data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setIsLoading(false); // 요청 완료 시 로딩 상태를 false로 설정
        if (onSuccess) {
          onSuccess(); // 상위 컴포넌트에 성공을 알림
        }
      })
      .catch((error) => {
        setIsLoading(false); // 요청 완료 시 로딩 상태를 false로 설정
        console.error("There was an error sending the request", error);
        if (onError) {
          onError(); // 상위 컴포넌트에 에러를 알림
        }
      });
  };
  return (
    <>
      <S.Wrap>
        {isLoading && (
          <S.LoadingContainer>
            <ColorRing
              visible={true}
              height="150"
              width="150"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#b8c480", "#B2A3B5", "#F4442E", "#51E5FF", "#429EA6"]}
            />
            <S.LoadingText className={textVisible ? "visible" : ""}>
              {loadingText}
            </S.LoadingText>
          </S.LoadingContainer>
        )}
        <S.Form>
          <textarea
            name="reason"
            id="reason"
            placeholder="반품 신청 사유 입력란"
            value={requestReason}
            onChange={(e) => setRequestReason(e.target.value)}>
          </textarea>
          <button onClick={handleSubmission}>신청</button>
          {/* <S.TextArea
            placeholder="반품 신청 사유 입력"
            value={requestReason}
            onChange={(e) => setRequestReason(e.target.value)}
          />
          <S.SubmitButton onClick={handleSubmission}>신청</S.SubmitButton> */}
        </S.Form>
      </S.Wrap>
    </>
  );
};

const S = {
  LoadingContainer: styled.div`
    position: absolute; // 상대 위치 설정
    top: 20px;
    left: 20px;
    right: 20px;
    bottom: 20px;
    display: flex;
    border-radius: 10px;
    flex-direction: column; // 아이템을 수직으로 정렬
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5); // 반투명 배경
  `,
  LoadingText: styled.div`
    margin-top: 20px;
    color: white;
    font-size: 25px;
    opacity: 0; // 초기 투명도
    transition: opacity 0.5s ease-in-out; // 투명도 변경 애니메이션
    &.visible {
      opacity: 1;
    }
  `,
  Wrap: styled.div`
    &::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none;

    background-color: #e7ecf2;
    height: 80%;
    overflow-y: auto;

    @media (max-width: 768px) {
      height: 300px;
    }
  `,
  Title: styled.span`
    font-size: 30px;
    font-weight: bold;
    color: #1d1f25;
    padding-bottom: 10px;
  `,
  Form: styled.form`
    padding-left: 20px;
    padding-right: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > textarea { 
      width: 100%;
      height: 180px;
      border-radius: 10px;
      color: #82858B;
      background-color: #F2F2F2;
      border: none;
      font-size: 1.3rem;
      margin-top: 10%;
      resize: none;
      overflow-y: auto;
    }
    > button {
      margin-top: 40px;
      background-color: #024c98;
      border: none;
      width: 40%;
      cursor: pointer;
      color: #F2F2F2;
      height: 50px;
      border-radius: 10px;
      padding: 2px;
      font-size: 25px;
      
      &:hover {
        background-color: #B6C0C9;
        border: none;
      }
      &:focus,
      &:active {
        background-color: #0056b3;
        border-color: #0056b3;
      }
    }
  `,
  FieldSet: styled.div`
    margin-bottom: 15px;
  `,
  Label: styled.label`
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: #034f9e;
  `,
  Input: styled.input`
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #d3d3d3;
    color: #1d1f25;
  `,
  TextArea: styled.textarea`
    width: 100%;
    height: 180px;
    border-radius: 10px;
    color: #82858B;
    background-color: #F2F2F2;
    border: none;
    font-size: 1.3rem;
    margin-top: 15px;
    resize: none;
    overflow-y: auto;
  `,
  CancelButton: styled.button`
    background-color: #e0e0e0;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 80px;
    cursor: pointer;
    height: 40px;
  `,
  SubmitButton: styled.button`
    margin-top: 40px;
    background-color: #024c98;
    border: none;
    width: 40%;
    cursor: pointer;
    color: #F2F2F2;
    height: 50px;
    border-radius: 10px;
    padding: 2px;
    font-size: 25px;
    &:hover {
      background-color: #B6C0C9;
      border: none;
    }
    &:focus,
    &:active {
      background-color: #0056b3;
      border-color: #0056b3;
    }
  `,
};

export default ReturnRequest;
