import styled from 'styled-components';
import * as components from '../../components';
import { useRecoilValue } from "recoil";
import { MemberIdState } from "../../states/states";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const memberId = useRecoilValue(MemberIdState);
  useEffect(() => {
    if (memberId && location.pathname !== "/main") {
      navigate("/main");
    }
  }, [memberId, location, navigate]);


  if(memberId==null){
    return (
      <S.Wrap>
        <components.Login></components.Login>
      </S.Wrap>
    );
  }

  return null; // memberId가 null이 아닐 때 null 반환
};

const S = {
  Wrap: styled.div`
    width: 100%;
    padding-top: 10%;

    /* 모바일 환경에서만 적용될 스타일 */
    @media (max-width: 768px) {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;  // 뷰포트의 높이로 설정
      padding-top: 0;  // 기존의 패딩 제거
    }
  `,
};

export default LoginPage;
