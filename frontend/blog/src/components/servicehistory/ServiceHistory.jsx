import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import { BiCaretRight } from "react-icons/bi";
import { BsFillCartFill } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { MemberIdState } from "../../states/states";
import http from "../../api/http";

const ServiceHistory = ({})=> {
  const memberId = useRecoilValue(MemberIdState);
  const [data, setData] = useState([]);
  useEffect(() => {
    http
      .get(`/api/batteries/member/${memberId}`)
      .then(({ data }) => {
        setData(() => {
          return data["data"];
        });
      })
      .catch();
  }, []);
    return(
      <S.Wrap>
    <S.Title className="d-flex align-items-center">
      <BsFillCartFill />
      반송 신청 내역
    </S.Title>

    <Form>
      <Table bordered>
        <thead className={"table-secondary"}>
          <tr>
            <th className="w-auto text-center">제품명</th>
            <th className="w-auto text-center">제조사</th>
            <th className="w-25 text-center">반송 신청 일자</th>
            <th className="w-25 text-center">진행 상태</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => {
            return (
              <tr key={idx}>
                <td>{item.code}</td>
                <td>{item.company}</td>
                <td>{item.deliveryDate}</td>
                <td className="text-center">
                  <BiCaretRight /> 상태입니다
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Form>
  </S.Wrap>
  );
}

export default ServiceHistory;
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