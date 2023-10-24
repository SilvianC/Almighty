import React from "react";
import { Nav } from "react-bootstrap";
import styled from "styled-components";

const SideBar = () => {
  return (
    <S.SideNavBar>
      <Nav
        className="col-md-12 d-none d-md-block bg-light sidebar"
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <div className="sidebar-sticky"></div>
        <Nav.Item>
          <Nav.Link href="/home">Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            Disabled
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </S.SideNavBar>
  );
};
export default SideBar;
const S = {
  SideNavBar: styled.div`
    height: 100%;
    background-color: #1428a0; // 파란색 배경
    z-index: 1000; // z-index 속성 추가
  `,
};
