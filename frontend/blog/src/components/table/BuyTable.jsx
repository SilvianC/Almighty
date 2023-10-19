import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { BiCaretRight } from "react-icons/bi";

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
    <Form>
      <Table bordered>
        <thead className={"table-secondary"}>
          <tr>
            <th>반송 신청</th>
            <th>제품명</th>
            <th>제조사</th>
            <th>제조일</th>
            <th>수령일</th>
            <th>상세 정보</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => {
            return (
              <tr key={idx}>
                <td>
                  <Form.Check></Form.Check>
                </td>
                <td>{item.code}</td>
                <td>{item.company}</td>
                <td>{item.createDate}</td>
                <td>{item.deliveryDate}</td>
                <td>
                  <BiCaretRight />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Form>
  );
};

export default BuyTable;
