import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../assets/images/logo-battery.gif";

function Header() {
  const navigate = useNavigate();

  return (
    <>
      <S.TopNavBar>
        <S.Logo onClick={() => navigate("/main")} src={Logo}></S.Logo>
      </S.TopNavBar>
      <S.SideNavBar />
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
    background-color: #1428A0; // 파란색 배경
    display: flex;
    align-items: center;
    padding-left: 20px; // 로고와 navbar 사이의 간격을 설정합니다.
    z-index: 1000; // z-index 속성 추가
  `,
  SideNavBar: styled.div`
    position: fixed;
    top: 60px; // 상단 navbar의 높이만큼 띄웁니다.
    left: 0;
    width: 60px; // 사이드바의 너비를 설정합니다. 원하는 너비로 조정 가능합니다.
    height: calc(100% - 60px); // 전체 화면 높이에서 상단 navbar의 높이를 뺀 만큼의 높이로 설정합니다.
    background-color: #1428A0; // 파란색 배경
    z-index: 1000; // z-index 속성 추가
  `,
  Logo: styled.img`
    width: 160px;
    height : 50px;
    cursor: pointer;
  `,
};

export default Header;
