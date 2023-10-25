import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { BiCaretRight } from "react-icons/bi";
import styled from "styled-components";
import { BsFillCartFill } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";

const data = [
  {
    code: "B0053",
    company: "asd",
    createDate: "1999-08-08",
    deliveryDate: "2023-07-07",
  },
  {
    code: "B0053",
    company: "dsa",
    createDate: "1999-08-08",
    deliveryDate: "2023-07-07",
  },
];
const BuyTable = ({}) => {
  return (
    <S.Wrap>
      <S.Title className="d-flex align-items-center">
        <BsFillCartFill />
        구매 리스트
      </S.Title>

      <Form>
        <Table bordered>
          <thead className={"table-secondary"}>
            <tr>
              <th className="w-auto"></th>
              <th className="w-auto text-center">제품명</th>
              <th className="w-auto text-center">제조사</th>
              <th className="w-25 text-center">제조일</th>
              <th className="w-25 text-center">수령일</th>
              <th className="w-auto text-center">정보</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td className="text-center">
                    <Form.Check value={item.code}></Form.Check>
                  </td>
                  <td>{item.code}</td>
                  <td>{item.company}</td>
                  <td>{item.createDate}</td>
                  <td>{item.deliveryDate}</td>
                  <td className="text-center">
                    <BiCaretRight />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Row>
          <Col className="d-flex justify-content-end">
            <Button>반품 요청</Button>
          </Col>
        </Row>
      </Form>
    </S.Wrap>
  );
};

export default BuyTable;

const S = {
  Wrap: styled.div`
    border: 1px solid #d3d3d3;
    margin: 20px;
    padding: 60px;
    padding-top: 30px; // 상단 navbar의 높이만큼 패딩을 줍니다.
    padding-left: 50px; // 왼쪽 navbar의 너비만큼 패딩을 줍니다.
    border-radius: 40px;
  `,
  Title: styled.span`
    font-size: 20px;
    font-weight: bold;
    color: #1428a0;
    padding-bottom: 30px;
  `,
};
