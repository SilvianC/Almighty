import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../assets/images/logo-battery.gif";
import Logos from "../../assets/images/basic_psa.jpg";
function Header() {
  const navigate = useNavigate();

  return (
    <>
      <S.TopNavBar>
        <S.Logo onClick={() => navigate("/main")} src={Logo}></S.Logo>
        <S.MobileAlarmTab onClick={() => navigate("/mobilealarm")} src={Logos}></S.MobileAlarmTab>
        <S.UserIcon onClick={() => navigate("/service-history")} src={Logos}></S.UserIcon>
        <S.UserIcon onClick={() => navigate("/returnconfirm")} src={Logos}></S.UserIcon>
        <S.UserIcon onClick={() => navigate("/return")} src={Logos}></S.UserIcon>
      </S.TopNavBar>
    </>
  );
}

const S = {
  TopNavBar: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px; // 상단 navbar의 높이를 설정합니다. 원하는 높이로 조정 가능합니다.
    background-color: #1428a0; // 파란색 배경
    align-items: center;
    padding-left: 20px; // 로고와 navbar 사이의 간격을 설정합니다.
    z-index: 1000; // z-index 속성 추가
  `,
  Logo: styled.img`
    width: 160px;
    height: 50px;
    cursor: pointer;
  `,
  MobileAlarmTab: styled.img`
    display: none; // 기본적으로 탭을 숨깁니다.

    @media (max-width: 768px) {
      
      margin-left: 180px; // 오른쪽 패딩 추가
      width: 24px; // 아이콘 크기
      height: 24px; // 아이콘 크기
      margin-top : -30px;
      cursor: pointer;
      display: block; // 모바일 환경에서만 탭을 표시합니다.
    }
  `,
  UserIcon: styled.img` // img로 수정
    margin-left: auto; // 오른쪽 정렬
    margin-right: 20px; // 오른쪽 패딩 추가
    width: 24px; // 아이콘 크기
    height: 24px; // 아이콘 크기
    cursor: pointer;
    @media (max-width: 768px) {
      display: none; // 모바일 환경에서는 이 탭을 숨깁니다.
    }
  `

};

export default Header;
