import React, { useEffect, useState } from "react";
import styled from "styled-components";
import http from "../../api/http";
import { BiMailSend } from "react-icons/bi";
const ReturnResponse = ({ item }) => {
  const [requestReason, setRequestReason] = useState("");

  const itemDate = new Date(item.date);
  const formattedDate = itemDate.toISOString().split("T")[0];

  return (
    <S.Wrap>
      <h1 style={{ marginTop: "5px", fontWeight: "bolder" }}>{item.code}</h1>
      <p>신청일자 {formattedDate}</p>
      <textarea
        name="reason"
        id="reason"
        readOnly
        value={
          item && item.toStatus === "Request"
            ? "반송 신청 진행 중 입니다."
            : item
              ? item.reason
              : ""
        }></textarea>
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div`
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 10px;
    height: 100%;
    overflow-y: auto;
    @media (max-width: 768px) {
      height: 300px;
    }

    > p {
      font-size: 1.2rem;
      color: #82858B;
    }
    > textarea {
      width: 100%;
      padding: 10px;
      border-radius: 10px;
      color: #82858B;
      background-color: #F2F2F2;
      border: none;
      font-size: 1.5rem;
      margin-top: 15px;
      height: 150px;
      resize: none;
      overflow-y: auto;
    }
  `,
};

export default ReturnResponse;
