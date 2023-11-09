import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import * as pages from "./pages";
import * as utils from "./utils";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import Intro from "./components/layout/Intro";
import Header from "./components/layout/Header";

import Footer from "./components/layout/Footer";
import SideBar from "./components/sidebar/Sidebar";

const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  if (isMobile) {
    return (
      <>
        <MobileWrapper>
          <Header></Header>
          <Routes>
            <Route path={utils.URL.LOGIN.MAIN} element={<pages.Login />} />
            <Route
              path={utils.URL.MOBILEALARM.MAIN}
              element={<pages.MobileAlarm />}
            />
            <Route path={utils.URL.RETURN.MAIN} element={<pages.Return />} />
          </Routes>
        </MobileWrapper>
      </>
    );
  }

  return (
    <AppWrapper>
      <SideBar></SideBar>

      <S.MainContent>
        <Routes>
          <Route path={utils.URL.LOGIN.MAIN} element={<pages.Login />} />
          <Route path={utils.URL.SIGNUP.MAIN} element={<pages.SignUp />} />
          <Route path={utils.URL.MAIN.MAIN} element={<pages.Main />} />
          <Route path={utils.URL.RETURN.MAIN} element={<pages.Return />} />
          <Route
            path={utils.URL.SERVICEHISTORY.MAIN}
            element={<pages.ServiceHistory />}
          />
          <Route
            path={utils.URL.RETURNCONFIRM.MAIN}
            element={<pages.ReturnConfirm />}
          />
        </Routes>
      </S.MainContent>
    </AppWrapper>
  );
};

const S = {
  MainContent: styled.div`
    padding-left: 50px;
    padding-top: 80px;
    flex: 1; // MainContent의 높이를 남은 공간 전체로 확장
  `,
};
const AppWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  height: 100%;
`;
const MobileWrapper = styled.div`
  min-height: 100vh;
  height: 100%;
`;
export default App;
