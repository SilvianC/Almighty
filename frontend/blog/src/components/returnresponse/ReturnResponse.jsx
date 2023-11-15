import React, { useEffect, useState } from "react";
import styled from "styled-components";
import http from "../../api/http";
import { BiMailSend } from "react-icons/bi";
const ReturnResponse = ({ item }) => {
  const [requestReason, setRequestReason] = useState("");

  return (
    <>
      <S.Wrap>
        <S.Title>
          <BiMailSend />
          {"\u00A0"}신청 결과
        </S.Title>
        <S.Form>
          <S.FieldSet>
            <S.Label>제품명</S.Label>
            <S.Input readOnly value={item ? item.code : ""} />
          </S.FieldSet>
          {/* <S.FieldSet>
              <S.Label>제품 ID</S.Label>
              <S.Input readOnly value={item ? item.id : ''} />
            </S.FieldSet> */}
          <S.FieldSet>
            <S.Label>신청일</S.Label>
            <S.Input readOnly value={item ? item.date : ""} />
          </S.FieldSet>
          <S.FieldSet>
            <S.Label>사유</S.Label>
            <S.TextArea
              readOnly
              value={
                item && item.toStatus === "Request"
                  ? "반송 신청 진행 중 입니다."
                  : item
                  ? item.reason
                  : ""
              }
            />
          </S.FieldSet>
        </S.Form>
      </S.Wrap>
    </>
  );
};

const S = {
  Wrap: styled.div`
    border: 1px solid #d3d3d3;
    margin: 20px;
    padding: 60px;
    padding-top: 20px; // 상단 navbar의 높이만큼 패딩을 줍니다.
    padding-left: 20px; // 왼쪽 navbar의 너비만큼 패딩을 줍니다.
    padding-right: 20px;
    border-radius: 10px;
    background-color: #f2f2f2;
    height: 90%;
    overflow-y: auto; // 세로 방향으로만 스크롤바를 설정
    box-shadow: 0px 2.77px 2.21px rgba(0, 0, 0, 0.0197),
      0px 12.52px 10.02px rgba(0, 0, 0, 0.035),
      0px 20px 80px rgba(0, 0, 0, 0.07);
    @media (max-width: 768px) {
      height: 300px;
    }
  `,
  Title: styled.span`
    font-size: 30px;
    font-weight: bold;
    color: #1d1f25;
    padding-bottom: 10px;
    @media (max-width: 768px) {
      font-size: 20px;
    }
  `,
  Form: styled.form`
    /* 필요한 스타일을 여기에 추가하실 수 있습니다. */
  `,
  FieldSet: styled.div`
    margin-bottom: 15px;
  `,
  Label: styled.label`
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: #034f9e;
  `,
  Input: styled.input`
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #d3d3d3;
    color: #034f9e;
  `,
  TextArea: styled.textarea`
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    color: #034f9e;
    border: 1px solid #d3d3d3;
    margin-top: 15px;
    height: 150px;
    resize: none;
    overflow-y: auto; // 세로 스크롤바 설정;
  `,
  ButtonsWrap: styled.div`
    display: flex;
    justify-content: right;
    margin-top: 20px;
  `,
  SubmitButton: styled.button`
    background-color: #024c98; // 부트스트랩의 기본 파란색
    border-color: #007bff;
    width: 80px;
    cursor: pointer;
    color: white;

    height: 40px;
    border-radius: 5px;
    padding: 2px;
    &:hover {
      background-color: #a5c7f8; // 호버 상태일 때 더 어두운 파란색
      border-color: #0056b3;
    }
    &:focus,
    &:active {
      background-color: #0056b3; // 클릭 상태일 때 색상
      border-color: #0056b3;
    }
  `,
};

export default ReturnResponse;
