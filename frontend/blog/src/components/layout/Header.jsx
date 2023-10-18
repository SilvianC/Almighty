import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../assets/images/logo-battery.gif";

function Header() {
  const navigate = useNavigate();

  return (
    <>
      <S.Logo onClick={() => navigate("/main")} src={Logo}></S.Logo>
    </>
  );
}

const S = {
    Logo: styled.img`
    width: 160px;
    cursor: pointer;
  `,
};

export default Header;
