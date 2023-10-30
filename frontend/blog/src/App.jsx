import React, { useState, useEffect } from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import * as pages from './pages';
import * as utils from './utils';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/layout/Header';
import { Col, Container, Row } from 'react-bootstrap';
import Sidebar from './components/layout/SideBar';

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
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (isMobile) {
    return (
      <>
        <Header></Header>
        <Routes>
          <Route path={utils.URL.LOGIN.MAIN} element={<pages.Login />} />
          <Route path={utils.URL.MOBILEALARM.MAIN} element={<pages.MobileAlarm/>}/>
        </Routes>
      </>
    );
  }

  return (
    <>
      <Header></Header>
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
    </>
  );
};

const S = {
  MainContent: styled.div`
    padding-left: 50px; 
    padding-top : 80px;
  `,
};

export default App;
