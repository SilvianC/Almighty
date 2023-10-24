import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import * as pages from "./pages";
import * as utils from "./utils";

// import Header from "/components/layout/Header.jsx";
// import Footer from "@/components/layout/Footer.jsx";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/layout/Header";

const App = () => {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path={utils.URL.LOGIN.MAIN} element={<pages.Login />} />
        <Route path={utils.URL.SIGNUP.MAIN} element={<pages.SingUp />} />
        <Route path={utils.URL.MAIN.MAIN} element={<pages.Main />} />
        <Route path={utils.URL.RETURN.MAIN} element={<pages.Return />} />
      </Routes>
    </>
  );
};
const S = {
  MainContent: styled.div`
    padding-top: 60px; // 상단 navbar의 높이만큼 패딩을 줍니다.
    padding-left: 60px; // 왼쪽 navbar의 너비만큼 패딩을 줍니다.
  `,
};
export default App;
