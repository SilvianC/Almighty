import React, { Fragment, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import { BsFillBellFill } from "react-icons/bs";
const AlarmTable = ()=>{
    return (
        <S.Wrap>
        <S.Title className="d-flex align-items-center">
        <BsFillBellFill />
            알림 내역
        </S.Title>
        <Form></Form>
        </S.Wrap>
    );
};

export default AlarmTable;

const S = {
    Wrap: styled.div`
      border: 1px solid #d3d3d3;
      margin: 20px;
      padding: 60px;
      padding-top: 30px; // 상단 navbar의 높이만큼 패딩을 줍니다.
      padding-left: 50px; // 왼쪽 navbar의 너비만큼 패딩을 줍니다.
      border-radius: 40px;
      min-height: calc(100vh - 120px); // 화면의 높이에서 마진 20px * 2를 뺀 높이로 설정
    `,
    Title: styled.span`
      font-size: 20px;
      font-weight: bold;
      color: #1428a0;
      padding-bottom: 30px;
    `,
  };
  