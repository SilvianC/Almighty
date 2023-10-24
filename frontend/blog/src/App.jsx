import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import * as pages from "./pages";
import * as utils from "./utils";

// import Header from "/components/layout/Header.jsx";
// import Footer from "@/components/layout/Footer.jsx";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/layout/Header";
import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "./components/layout/SideBar";

const App = () => {
  return (
    <div style={{ height: "100%" }}>
      <Row>
        <Col sm={12}>
          <Header></Header>
        </Col>
      </Row>
      <Row style={{ height: "100%" }}>
        <Col md={1} style={{ height: "100%" }}>
          <Sidebar></Sidebar>
        </Col>
        <Col md={11}>
          <Routes>
            <Route path={utils.URL.LOGIN.MAIN} element={<pages.Login />} />
            <Route path={utils.URL.SIGNUP.MAIN} element={<pages.SingUp />} />
            <Route path={utils.URL.MAIN.MAIN} element={<pages.Main />} />
            <Route path={utils.URL.RETURN.MAIN} element={<pages.Return />} />
          </Routes>
        </Col>
      </Row>
    </div>
  );
};
const S = {
  MainContent: styled.div`
    padding-top: 60px; // 상단 navbar의 높이만큼 패딩을 줍니다.
    padding-left: 60px; // 왼쪽 navbar의 너비만큼 패딩을 줍니다.
  `,
};
export default App;
