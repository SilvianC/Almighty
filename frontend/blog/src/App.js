import React from "react";
import {Routes,Route} from "react-router-dom"
import styled from "styled-components";
import * as pages from "./pages";
import * as utils from "./utils";

function App() {
  return (
    <div className="App">
  
        <Routes>
          <Route path={utils.URL.LOGIN.MAIN} element={<pages.Login/>} />
          <Route path={utils.URL.SIGNUP.MAIN} element={<pages.SingUp/>} />
          <Route path={utils.URL.MAIN.MAIN} element={<pages.Main/>} />
        </Routes>
    
    </div>
  );
}

export default App;

const S = {
  ContentContainer: styled.div`
    padding-bottom: 73px;
    min-height: calc(
      100vh - 108px - 73px
    ); // 100vh에서 TopTab(108px)와 BottomNav(73px)의 높이를 뺀 길이
  `,
};