import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import * as pages from "./pages";
import * as utils from "./utils";
// import Header from "/components/layout/Header.jsx";
// import Footer from "@/components/layout/Footer.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/layout/Header";

const App = () =>{
  return (
  <>
    <Header />
    <Routes>
      <Route path={utils.URL.LOGIN.MAIN} element={<pages.Login />} />
      <Route path={utils.URL.SIGNUP.MAIN} element={<pages.SingUp />} />
      <Route path={utils.URL.MAIN.MAIN} element={<pages.Main />} />
    </Routes>
  </>
  )
};

export default App;
