import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import { BiCaretRight } from "react-icons/bi";
import { BsFillCartFill } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";
import http from "../../api/http";

const ReturnConfirmTable = ({ data }) => {
  const [accept, setAccept] = useState([]);
  const [reject, setReject] = useState([]);
  const handleAccept = (e) => {
    if (e.target.checked) {
      setReject(reject.filter((item) => item !== e.target.value));
      setAccept((prev) => [...prev, e.target.value]);
    } else {
      setAccept(accept.filter((item) => item !== e.target.value));
    }
  };
  const handleReject = (e) => {
    if (e.target.checked) {
      setAccept(accept.filter((item) => item !== e.target.value));
      setReject((prev) => [...prev, e.target.value]);
    } else {
      setReject(reject.filter((item) => item !== e.target.value));
    }
  };
  return (
    <S.Wrap>
      <S.Title className="d-flex align-items-center">
        <BsFillCartFill />
        반품 요청 목록
      </S.Title>

      <Form>
        <Table bordered>
          <thead className={"table-secondary"}>
            <tr>
              <th className="w-auto text-center">승인</th>
              <th className="w-auto text-center">반려</th>
              <th className="w-auto text-center">제품명</th>
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
                    <Form.Check
                      value={item.code}
                      onChange={(e) => {
                        handleAccept(e);
                      }}
                      checked={accept.includes(item.code)}
                    ></Form.Check>
                  </td>
                  <td className="text-center">
                    <Form.Check
                      value={item.code}
                      onChange={(e) => {
                        handleReject(e);
                      }}
                      checked={reject.includes(item.code)}
                    ></Form.Check>
                  </td>
                  <td className="text-center">{item.code}</td>
                  <td className="text-center">{item.madeDate}</td>
                  <td className="text-center">{item.receiveDate}</td>
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
            <Button>저장</Button>
          </Col>
        </Row>
      </Form>
    </S.Wrap>
  );
};

export default ReturnConfirmTable;

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
