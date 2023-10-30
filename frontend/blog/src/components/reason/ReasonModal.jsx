import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import http from "../../api/http";
import styled from "styled-components";
import { Form } from "react-bootstrap";
function ReasonModal({ itemCode }) {
  const [reason, setReason] = useState("");
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    if (isSent) window.location.reload();
  }, [isSent]);

  const handleSendData = () => {
    http
      .put(`/api/batteries/request`, { code: itemCode, reason: reason })
      .then(() => {
        setIsSent(true);
      })
      .catch();
  };

  return (
    <S.Wrap>
      <S.Title>{itemCode} 요청 사유</S.Title>
      <S.Body>
        <Form.Control
          as="textarea"
          style={{ height: "300px", minHeight: "100px", maxHeight: "500px" }}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div style={{ textAlign: "right" }}>{reason.length}/1000</div>
      </S.Body>
      <Button style={{ marginTop: "10px" }} onClick={handleSendData}>
        전송
      </Button>
      {isSent && <div>전송 완료</div>}
    </S.Wrap>
  );
}

export default ReasonModal;

const S = {
  Wrap: styled.div`
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  `,
  Title: styled.h2`
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
    color: #333;
    display: flex;
    align-items: center;
    gap: 10px;
  `,
  Body: styled.div`
    width: 100%;
  `,
};
