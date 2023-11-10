import styled from "styled-components";
import * as components from "../../components";
import { useRecoilValue } from "recoil";
import { MemberIdState } from "../../states/states";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const memberId = useRecoilValue(MemberIdState);
  // useEffect(() => {

  //   if (memberId && location.pathname !== "/main") {
  //     navigate("/main");
  //   }
  // }, [memberId, location, navigate]);

  return (
    <>
      <S.Wrap>
        <S.Title>
          <p>
            삼성 SDI만의 <br />
            배터리 반송 승인 서비스
            <br />
            이용하기
            <br />
          </p>
        </S.Title>
        <S.Com>
          <components.Login></components.Login>
        </S.Com>
      </S.Wrap>
    </>
  );

  return null; // memberId가 null이 아닐 때 null 반환
};

const S = {
  Wrap: styled.div`
    width: 100%;
    overflow-x: hidden;
    position: relative;
    @media (max-width: 768px) {
      justify-content: center;
      align-items: center;
      height: 100vh; // 뷰포트의 높이로 설정
      padding-top: 0; // 기존의 패딩 제거
    }
  `,
  Title: styled.div`
    position: relative;
    font-family: "Arial", sans-serif; // 원하는 폰트로 변경
    font-weight: bold; // 볼드 스타일 적용
    font-size: 34px; // 폰트 크기 조절
    color: #333; // 글자 색상 변경
    text-shadow: 0px 3px 3px rgba(0, 0, 0, 0.3); // 여기를 추가
    top: 180px;
    left: 180px;
    @media (max-width: 768px) {
      display: none;
    }
  `,
  Com: styled.div`
    position: relative;
    left: 250px;
    @media (max-width: 768px) {
      width: 200%;
      left: 50%; // 부모 컨테이너의 50% 위치에 컴포넌트를 배치
      top: 50%; // 부모 컨테이너의 50% 위치에 컴포넌트를 배치
      transform: translate(
        -50%,
        -50%
      ); // 컴포넌트의 중앙이 부모 컨테이너의 중앙에 오도록 조정
    }
  `,
};

export default LoginPage;
