import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import http from "../../api/http";
import { BiMailSend } from "react-icons/bi";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ReturnRequest = ({ onClose, item }) => {
    const [requestReason, setRequestReason] = useState('');
    const handleClose = (event) => {
        event.preventDefault();
        onClose();
    };
    const handleSubmission = (event) => {
        event.preventDefault();
        
        const data = {
          batteryId: item.id,
          fromStatus: 'Request',
          toStatus: 'Request',
          requestReason: requestReason,
        };
    
        http.post('/api/batteries/history', data)
          .then((response) => {
            console.log(response.data); // 응답 데이터를 출력합니다.
            toast.success('성공적으로 요청되었습니다!');
            onClose(); // 요청이 성공적으로 완료되면 모달을 닫습니다.
          })
          .catch((error) => {
            console.error('There was an error sending the request', error);
          });
    };
  return (
    <>
        <S.Wrap>
          <S.Title><BiMailSend/>{'\u00A0'}반품 신청</S.Title>
          <S.Form>
            <S.FieldSet>
              <S.Label>제품명</S.Label>
              <S.Input readOnly value={item ? item.code : ''} />
            </S.FieldSet>
            <S.FieldSet>
              <S.Label>제품 ID</S.Label>
              <S.Input readOnly value={item ? item.id : ''} />
            </S.FieldSet>
            <S.FieldSet>
              <S.Label>수령일</S.Label>
              <S.Input readOnly value={item ? item.receiveDate : ''} />
            </S.FieldSet>
            <S.TextArea placeholder="반품 신청 사유를 입력하세요." 
            value={requestReason}
            onChange={(e) => setRequestReason(e.target.value)}
            />
            <S.ButtonsWrap>
              <S.CancelButton onClick={handleClose}>취소</S.CancelButton>
              <S.SubmitButton onClick={handleSubmission}>신청</S.SubmitButton>
            </S.ButtonsWrap>
          </S.Form>
        </S.Wrap>
        <ToastContainer />
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
    background-color: #F2F2F2;
    height:600px;
    overflow-y: auto; // 세로 방향으로만 스크롤바를 설정
  `,
  Title: styled.span`
    font-size: 30px;
    font-weight: bold;
    color: #1D1F25;
    padding-bottom: 10px;
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
    color: #034F9E;
  `,
  Input: styled.input`
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #d3d3d3;
    color: #1D1F25;
  `,
  TextArea: styled.textarea`
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #d3d3d3;
    margin-top: 15px;
    height: 150px;
    resize: vertical;
  `,
  ButtonsWrap: styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  `,
  CancelButton: styled.button`
    background-color: #e0e0e0;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  `,
  SubmitButton: styled.button`
    background-color: #007BFF;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  `,
};

export default ReturnRequest;
