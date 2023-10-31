import React, { useEffect, useState } from "react";
import BuyTable from "../../components/table/BuyTable";
import styled from "styled-components";
import { BsPencilSquare } from "react-icons/bs";
import http from "../../api/http";
import * as components from '../../components';
import AlarmTable from "../../components/alarm/AlarmTable";

const MobileAlarm = () =>{
    return(
        <S.AlarmWrapper>
          <AlarmTable />
        </S.AlarmWrapper>
    );
};

const S = {
    AlarmWrapper: styled.div`
        /* 여기에 스타일을 정의하세요. */
        @media (max-width: 768px) {
            justify-content: center;
            align-items: center;
            height: 100vh;  // 뷰포트의 높이로 설정
            padding-top : 60px;
          }
    `
};

export default MobileAlarm;