import React, { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import { BsFillClipboard2CheckFill } from "react-icons/bs";
import { useRecoilValue } from "recoil";
import { MemberIdState } from "../../states/states";
import http from "../../api/http";
const status = {
  Normal: "정상",
  Request: "반품 요청",
  Upload: "데이터 업로드",
  Analysis: "분석 중",
  CustomerFault: "고객 귀책",
  SdiFault: "제품 결함",
};
const ServiceHistory = ({ data, page, setPage, totalPage }) => {
  return (
    <S.Wrap>
      <S.Title className="d-flex align-items-center">
        <BsFillClipboard2CheckFill />{'\u00A0'}
        반송 신청 결과
      </S.Title>

      <Form>
        <S.Table bordered>
          <thead className={"table-secondary"}>
            <tr>
              <th className="w-auto text-center">제품명</th>
              <th className="w-auto text-center">신청일</th>
              <th className="w-25 text-center">결과</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td>{item.code}</td>
                  <td>{item.date}</td>
                  <td>{status[item.toStatus]}</td>
                </tr>
              );
            })}
          </tbody>
        </S.Table>
      </Form>
      <S.PageArea>
        <S.PageBox>1</S.PageBox>
      </S.PageArea>
    </S.Wrap>
  );
};

export default ServiceHistory;
const S = {
  Wrap: styled.div`
    border: 1px solid #d3d3d3;
    margin: 20px;
    padding: 60px;
    padding-top: 20px; // 상단 navbar의 높이만큼 패딩을 줍니다.
    padding-left: 20px; // 왼쪽 navbar의 너비만큼 패딩을 줍니다.
    padding-right: 20px;
    border-radius: 10px;
    background-color: #F2F2F2;
    height:600px;
    overflow-y: auto; // 세로 방향으로만 스크롤바를 설정
    
  `,
  Title: styled.span`
  font-size: 30px;
  font-weight: bold;
  color: #1D1F25;
  padding-bottom: 10px;
  `,
  PageArea: styled.div`
    text-align: center;
  `,
  PageBox: styled.span``,
  Table: styled(Table)`
    border-collapse: collapse; // 테이블의 선을 없애기 위해 collapse 설정
    background-color: #F2F2F2;
    text-align: center;
    padding:1px;
    thead tr, tbody tr {
      border: none !important;
      font-weight: bold;
      font-size: 18px;
    }
    tr:hover td {background:#E7ECF2}
    th, td {
      border: none !important; // 모든 th, td 태그에 적용된 기본 선을 제거
      font-weight: bold;
      font-size: 18px;
      background-color: #F2F2F2;
    }

    th{
      background-color: #E7ECF2; // 하늘색 배경 적용
      color: #034F9E;
      font-weight: bold;
      font-size: 20px;
      
    }
  `,
};
