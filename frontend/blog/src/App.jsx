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
    <>
      <Sidebar></Sidebar>
      <Header></Header>
      <S.MainContent>
        <Routes>
          <Route path={utils.URL.LOGIN.MAIN} element={<pages.Login />} />
          <Route path={utils.URL.SIGNUP.MAIN} element={<pages.SingUp />} />
          <Route path={utils.URL.MAIN.MAIN} element={<pages.Main />} />
          <Route path={utils.URL.RETURN.MAIN} element={<pages.Return />} />
          <Route
            path={utils.URL.SERVICEHISTORY.MAIN}
            element={<pages.ServiceHistory />}
          />
        </Routes>
      </S.MainContent>
    </>
  );
};
const S = {
  MainContent: styled.div`
    padding-left: 50px; // 왼쪽 navbar의 너비만큼 패딩을 줍니다.
  `,
};
export default App;
