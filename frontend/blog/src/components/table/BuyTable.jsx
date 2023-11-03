import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { BiCaretRight } from "react-icons/bi";
import styled from "styled-components";
import { BsListUl, BsFillFileEarmarkTextFill } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import { Modal, Col, Row } from "react-bootstrap";
import ModelTable from "./ModelTable";
import ReasonModal from "../reason/ReasonModal";
import http from "../../api/http";
const BuyTable = ({ data , onApplyClick}) => {
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
        <BsListUl />{'\u00A0'}
        배터리 목록 및 반송 신청
      </S.Title>

      <S.Form >
        <S.Table bordered>
          <thead className={"table-secondary"}>
            <tr>
              <th className="w-auto text-center">제품명</th>
              <th className="w-25 text-center">제조일</th>
              <th className="w-25 text-center">수령일</th>
              <th className="w-auto text-center">반송 신청</th>
            </tr>
          </thead>
          <tbody style={{hover: '#333333'}}>
            {data.map((item, idx) => {
              return (
                <tr key={idx} style={{hover: '#333333'}}>
                  <td className="text-center">{item.code}</td>
                  <td className="text-center">{item.madeDate}</td>
                  <td className="text-center">{item.receiveDate}</td>
                  <td className="text-center">
                  <ApplyButton onClick={() => onApplyClick(item)}>
                    신청
                  </ApplyButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </S.Table>
      </S.Form>
      
    </S.Wrap>
  );
};

export default BuyTable;
const ApplyButton = styled(Button)`
  background-color: #024C98; // 부트스트랩의 기본 파란색
  border-color: #007bff;
  width:80px;
  height:30px;
  padding:2px;
  &:hover {
    background-color: #A5C7F8; // 호버 상태일 때 더 어두운 파란색
    border-color: #0056b3;
  }
  &:focus, &:active {
    background-color: #0056b3; // 클릭 상태일 때 색상
    border-color: #0056b3;
  }
`;

const S = {
  Wrap: styled.div`
    border: 1px solid #d3d3d3;
    margin: 20px;
    padding: 60px;
    padding-top: 20px; // 상단 navbar의 높이만큼 패딩을 줍니다.
    padding-left: 25px; // 왼쪽 navbar의 너비만큼 패딩을 줍니다.
    padding-right:10px;
    height:600px;
    overflow-y: auto; // 세로 방향으로만 스크롤바를 설정
    border-radius: 10px;
    background-color: #F2F2F2;
  `,
  Title: styled.span`
    font-size: 30px;
    font-weight: bold;
    color: #1D1F25;
    padding-bottom: 10px;
  `,
  Status: styled.span`
    font-size: 10px;
  `,
  Form: styled.span`
  `,
  Table: styled(Table)`
    border-collapse: collapse; // 테이블의 선을 없애기 위해 collapse 설정
    background-color: #F2F2F2;
    padding:1px;

    thead tr, tbody tr {
      border: none !important;
      font-weight: bold;
      font-size: 18px;
    }
    tbody > tr:hover {
      background-color: #333333 !important;
    }
    tr:hover td {background:#E7ECF2}
    th, td {
      border: none !important; // 모든 th, td 태그에 적용된 기본 선을 제거
      font-weight: bold;
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
