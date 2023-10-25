import React from "react";
import { Nav } from "react-bootstrap";
import styled from "styled-components";

const SideBar = () => {
  return <S.SideNavBar></S.SideNavBar>;
};
export default SideBar;
const S = {
  SideNavBar: styled.div`
    position: fixed;
    height: 100%;
    width: 30px;
    background-color: #1428a0; // 파란색 배경
    z-index: -1; // z-index 속성 추가
  `,
};
