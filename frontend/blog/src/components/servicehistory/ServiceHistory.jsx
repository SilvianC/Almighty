import React, { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import { BsFillCartFill } from "react-icons/bs";

import http from "../../api/http";

const ServiceHistory = ({}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    http
      .get(`/api/batteries/history/all`)
      .then(({ data }) => {
        setData(() => {
          return data["data"];
        });
      })
      .catch();
  }, []);
  console.log(data);
  return (
    <S.Wrap>
      <S.Title className="d-flex align-items-center">
        <BsFillCartFill />
        반송 신청 히스토리
      </S.Title>

      <Form>
        <Table bordered>
          <thead className={"table-secondary"}>
            <tr>
              <th className="w-25 text-center">History ID</th>
              <th className="w-auto text-center">Battery ID</th>
              <th className="w-auto text-center">fromStatus</th>
              <th className="w-25 text-center">toStatus</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td>{item.historyId}</td>
                  <td>{item.batteryId}</td>
                  <td>{item.fromStatus}</td>
                  <td>{item.toStatus}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Form>
    </S.Wrap>
  );
};

export default ServiceHistory;
const S = {
  Wrap: styled.div`
    border: 1px solid #d3d3d3;
    margin: 20px;
    padding: 60px;
    padding-top: 30px; // 상단 navbar의 높이만큼 패딩을 줍니다.
    padding-left: 50px; // 왼쪽 navbar의 너비만큼 패딩을 줍니다.
    border-radius: 40px;
    min-height: calc(
      100vh - 120px
    ); // 화면의 높이에서 마진 20px * 2를 뺀 높이로 설정
  `,
  Title: styled.span`
    font-size: 20px;
    font-weight: bold;
    color: #1428a0;
    padding-bottom: 30px;
  `,
};
