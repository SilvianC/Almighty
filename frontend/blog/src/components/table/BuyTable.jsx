import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { BiCaretRight } from "react-icons/bi";
import styled from "styled-components";
import { BsFillCartFill, BsFillFileEarmarkTextFill } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import { Modal, Col, Row } from "react-bootstrap";
import ModelTable from "./ModelTable";
import ReasonModal from "../reason/ReasonModal";
import http from "../../api/http";
const BuyTable = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState(null);
  const [checkedInputs, setCheckedInputs] = useState([]);
  const [selectedItemCode, setSelectedItemCode] = useState(null);

  const handleSave = () => {
    console.log(checkedInputs);
    http.put(`/api/batteries/request`, checkedInputs).then().catch();
  };

  const openReasonModal = (itemCode) => {
    setSelectedItemCode(itemCode);
    setShowReasonModal(true);
  };

  const closeReasonModal = () => {
    setSelectedItemCode(null);
    setShowReasonModal(false);
  };

  const handleIconClick = (modelId, code) => {
    setSelectedModelId(modelId);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedModelId(null);
  };
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
              <th className="w-auto text-center">진행 상태</th>
              <th className="w-auto text-center">제품명</th>
              <th className="w-25 text-center">제조일</th>
              <th className="w-25 text-center">수령일</th>
              <th className="w-auto text-center">상세 정보</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td className="text-center">
                    {item.status === "Request" ? (
                      <Button variant="secondary" disabled>
                        진행 중
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        onClick={() => openReasonModal(item.code)}
                      >
                        모달 열기
                      </Button>
                    )}
                  </td>
                  <td className="text-center">{item.code}</td>
                  <td className="text-center">{item.madeDate}</td>
                  <td className="text-center">{item.receiveDate}</td>
                  <td className="text-center">
                    <BsFillFileEarmarkTextFill
                      onClick={() => handleIconClick(item.modelId)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Form>
      <Modal show={showModal} onHide={handleClose}>
        <ModelTable modelId={selectedModelId} />
      </Modal>
      <Modal show={showReasonModal} onHide={closeReasonModal}>
        <ReasonModal itemCode={selectedItemCode} />
      </Modal>
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
  Status: styled.span`
    font-size: 10px;
  `,
};
