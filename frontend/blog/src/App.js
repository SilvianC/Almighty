import React from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import * as pages from "./pages";
import * as utils from "./utils";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={utils.URL.LOGIN.MAIN} element={<pages.Login />} />
        <Route path={utils.URL.SIGNUP.MAIN} element={<pages.SingUp />} />
        <Route path={utils.URL.MAIN.MAIN} element={<pages.Main />} />
      </Routes>
    </div>
  );
}

export default App;

const S = {};
