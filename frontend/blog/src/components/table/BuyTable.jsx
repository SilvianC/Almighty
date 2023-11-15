import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import styled from "styled-components";
import { BsListUl, BsFillFileEarmarkTextFill } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import http from "../../api/http";
import ReturnRequest from "../../components/returnrequest/ReturnRequest";
const BuyTable = ({ data, onApplyClick, onSuccess, onError }) => {
  const [checkedInputs, setCheckedInputs] = useState([]);

  return (
    <S.Wrap>
      <S.Title className="d-flex align-items-center">
        <BsListUl />
        {"\u00A0"}
        배터리 목록 및 반송 신청
      </S.Title>
      <div className="Container">
        {data.map((item, idx) => {
          return (
            <div
              className={
                item.status === "InProgress"
                  ? "flip-card1"
                  : item.status === "Analysis"
                  ? "flip-card1"
                  : item.status === "Return"
                  ? "flip-card1"
                  : "flip-card"
              }
            >
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <h1>John Doe</h1>
                  <p>{item.code}</p>
                  <p>
                    {item.status === "InProgress" ? (
                      <CompletedButton disabled>진행 중</CompletedButton>
                    ) : item.status === "Analysis" ? (
                      <CompletedButton disabled>분석 중</CompletedButton>
                    ) : item.status === "Return" ? (
                      <CompletedButton disabled>반송 중</CompletedButton>
                    ) : (
                      <ApplyButton onClick={() => onApplyClick(item)}>
                        신청
                      </ApplyButton>
                    )}
                  </p>
                </div>

                <div className="flip-card-back">
                  <ReturnRequest
                    item={item}
                    onSuccess={onSuccess}
                    onError={onError}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </S.Wrap>
  );
};

export default BuyTable;

const CompletedButton = styled(Button)`
  // 비활성화된 버튼 스타일
  background-color: #b6c0c9 !important;
  color: #000 !important;
  width: 80px;
  font-weight: bold;
  height: 30px;
  padding: 2px;
  cursor: not-allowed;
  &:hover {
    background-color: #b6c0c9;
  }
`;

const ApplyButton = styled(Button)`
  background-color: #024c98; // 부트스트랩의 기본 파란색
  border-color: #007bff;
  width: 80px;
  height: 30px;
  font-weight: bold;
  padding: 2px;
  &:hover {
    background-color: #a5c7f8; // 호버 상태일 때 더 어두운 파란색
    border-color: #0056b3;
  }
  &:focus,
  &:active {
    background-color: #0056b3; // 클릭 상태일 때 색상
    border-color: #0056b3;
  }
`;

const S = {
  Wrap: styled.div`
    .Container {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
    .flip-card {
      background-color: transparent;
      width: 400px;
      height: 400px;
      border: 1px solid #f1f1f1;
      perspective: 1000px; /* Remove this if you don't want the 3D effect */
    }

    /* This container is needed to position the front and back side */
    .flip-card-inner {
      position: relative;
      width: 100%;
      height: 100%;
      text-align: center;
      transition: transform 0.8s;
      transform-style: preserve-3d;
    }
    .flip-card1 {
      background-color: transparent;
      width: 400px;
      height: 400px;
      border: 1px solid #f1f1f1;
      perspective: 1000px; /* Remove this if you don't want the 3D effect */
    }

    /* This container is needed to position the front and back side */
    .flip-card-inner1 {
      position: relative;
      width: 100%;
      height: 100%;
      text-align: center;
      transition: transform 0.8s;
      transform-style: preserve-3d;
    }

    /* Do an horizontal flip when you move the mouse over the flip box container */
    .flip-card:hover .flip-card-inner {
      transform: rotateY(180deg);
    }

    /* Position the front and back side */
    .flip-card-front,
    .flip-card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      -webkit-backface-visibility: hidden; /* Safari */
      backface-visibility: hidden;
    }

    /* Style the front side (fallback if image is missing) */
    .flip-card-front {
      background-color: #bbb;
      color: black;
    }

    /* Style the back side */
    .flip-card-back {
      background-color: dodgerblue;
      color: white;
      transform: rotateY(180deg);
    }
    border: 1px solid #d3d3d3;
    margin: 20px;
    padding: 60px;
    padding-top: 20px; // 상단 navbar의 높이만큼 패딩을 줍니다.
    padding-left: 25px; // 왼쪽 navbar의 너비만큼 패딩을 줍니다.
    padding-right: 10px;
    height: 600px;
    overflow-y: auto; // 세로 방향으로만 스크롤바를 설정
    border-radius: 10px;
    background-color: #f2f2f2;
    box-shadow: 0px 2.77px 2.21px rgba(0, 0, 0, 0.0197),
      0px 12.52px 10.02px rgba(0, 0, 0, 0.035),
      0px 20px 80px rgba(0, 0, 0, 0.07);
    @media (max-width: 768px) {
      height: 300px;
    }
  `,
  Title: styled.span`
    font-size: 30px;
    font-weight: bold;
    color: #1d1f25;
    padding-bottom: 10px;
    @media (max-width: 768px) {
      font-size: 20px;
    }
  `,
  Status: styled.span`
    font-size: 10px;
  `,
  Form: styled.span``,
  Table: styled(Table)`
    border-collapse: collapse; // 테이블의 선을 없애기 위해 collapse 설정
    background-color: #f2f2f2;
    padding: 1px;

    thead tr,
    tbody tr {
      border: none !important;
      font-weight: bold;
      font-size: 18px;
    }
    tbody > tr:hover {
      background-color: #333333 !important;
    }
    tr:hover td {
      background: #e7ecf2;
    }
    th,
    td {
      border: none !important; // 모든 th, td 태그에 적용된 기본 선을 제거
      font-weight: bold;
      background-color: #f2f2f2;
    }

    th {
      background-color: #e7ecf2; // 하늘색 배경 적용
      color: #034f9e;
      font-weight: bold;
      font-size: 20px;
    }
  `,
};
