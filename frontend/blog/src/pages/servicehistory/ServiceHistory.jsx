import React from "react";
import * as components from "../../components";
import styled from "styled-components";
// import "./ServiceHistory.css";

const data = [
  // 데이터 배열 예시
  {
    BatteryName: "1",
    BuyerName: "삼성전자",
    RequestDate: "2023-10-25",
    CurrentStatus: "요청",
  },
  {
    BatteryName: "2",
    BuyerName: "삼성전자",
    RequestDate: "2023-10-25",
    CurrentStatus: "요청",
  },
  {
    BatteryName: "3",
    BuyerName: "삼성전기",
    RequestDate: "2023-10-24",
    CurrentStatus: "답변 완료",
  },
  {
    BatteryName: "4",
    BuyerName: "삼성전기",
    RequestDate: "2023-10-26",
    CurrentStatus: "분석 중",
  },
  {
    BatteryName: "5",
    BuyerName: "삼성전자",
    RequestDate: "2023-10-26",
    CurrentStatus: "분석 중",
  },
  // 추가 데이터
];
const columns = [
  // 칼럼 정의
  { Header: "제품명", accessor: "BatteryName" },
  { Header: "고객사명", accessor: "BuyerName" },
  { Header: "반송신청일자", accessor: "RequestDate" },
  { Header: "진행상태", accessor: "CurrentStatus" },
  // 추가 칼럼
];

const ServiceHistory = () => {
  return (
    <S.Container>
      <S.Title>서비스 이용내역</S.Title>
      <components.ServiceHistory data={data} columns={columns} />
    </S.Container>
  );
};

export default ServiceHistory;

const S = {
  Container: styled.div``,
  Title: styled.div`
    font-size: 30px;
    font-weight: bold;
    color: #1428a0;
  `,
};
