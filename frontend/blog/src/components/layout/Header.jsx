import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../assets/images/logo-battery.gif";
import Login from "../login/Login";

function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <ul>
        <li>
          <S.Logo onClick={() => navigate("/main")} src={Logo}></S.Logo>
        </li>
        <li>
          <div onClick={() => navigate("/login")}>login</div>
        </li>
        <li>
          <div onClick={() => navigate("/signup")}>signup</div>
        </li>
      </ul>
    </header>
  );
}

const S = {
  Logo: styled.img`
    width: 100px;
    cursor: pointer;
  `,
};

export default Header;
