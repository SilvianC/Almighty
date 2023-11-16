import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../assets/images/sdilogo.png";
import ssafyLogo from "../../assets/images/ssafylogo.png";
function Footer() {
  const navigate = useNavigate();

  return (
    <S.FooterContainer>
      <S.LinksContainer>
        <S.Logo2 onClick={() => window.open("https://www.ssafy.com/", "_blank")} src={ssafyLogo}/>
        {/* 다른 링크들을 추가하세요 */}
      </S.LinksContainer>
      <S.Address>경기도 용인시 기흥구 공세로 150-20[17084]</S.Address>
      <S.Copyright>COPYRIGHT 2016 SAMSUNG SDI CO.,LTD. ALL RIGHT RESERVED.</S.Copyright>
      <S.Logo onClick={() => window.open("https://www.samsungsdi.co.kr/index.html", "_blank")} src={Logo} />
    </S.FooterContainer>
  );
}

const S = {
  FooterContainer: styled.div`
    display: flex;
    justify-content: center;  // 중앙 정렬로 변경
    align-items: center;
    padding: 20px;
    background-color: #D5DFE9;
    height: 150px;
    gap: 30px;
  `,
  LinksContainer: styled.div`
    display: flex;
    gap: 1px;
  `,
  LinkItem: styled.a`
    cursor: pointer;
    color: #333;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  `,
  Logo: styled.img`
    width: 160px;
    cursor: pointer;
  `,
  Logo2: styled.img`
    width: 100px;
    cursor: pointer;
  `,
  Address: styled.div`
    font-size: 14px;
    color: #999;
  `,
  Copyright: styled.div`
    font-size: 14px;
    color: #999;
  `
};

export default Footer;
