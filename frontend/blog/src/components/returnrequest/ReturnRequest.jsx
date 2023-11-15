import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import http from "../../api/http";
import { ColorRing } from "react-loader-spinner";
import { useRecoilValue } from "recoil";
import { MemberIdState, AccessTokenState } from "../../states/states";
import { BiMailSend } from "react-icons/bi";
const ReturnRequest = ({ onClose, item, onSuccess, onError }) => {
  const [requestReason, setRequestReason] = useState("");
  const memberId = useRecoilValue(MemberIdState);
  const accessToken = useRecoilValue(AccessTokenState);
  const handleClose = (event) => {
    event.preventDefault();
    onClose();
  };
  const boltRef = useRef(null);
  const divRef = useRef(null);

  // 로딩 상태를 추적하는 상태 변수
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmission = (event) => {
    event.preventDefault();
    setIsLoading(true); // 요청 시작 시 로딩 상태를 true로 설정
    const data = {
      id: memberId,
      title: "반송 신청",
      code: item.code,
      reason: requestReason,
    };

    http
      .post("/api/batteries/progress/request", data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setIsLoading(false); // 요청 완료 시 로딩 상태를 false로 설정
        if (onSuccess) {
          onSuccess(); // 상위 컴포넌트에 성공을 알림
        }
        onClose();
      })
      .catch((error) => {
        setIsLoading(false); // 요청 완료 시 로딩 상태를 false로 설정
        console.error("There was an error sending the request", error);
        if (onError) {
          onError(); // 상위 컴포넌트에 에러를 알림
        }
      });
  };
  return (
    <>
      <S.Wrap>
        {isLoading && (
          <S.LoadingContainer>
            <ColorRing
              visible={true}
              height="100"
              width="100"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#b8c480", "#B2A3B5", "#F4442E", "#51E5FF", "#429EA6"]}
            />
            <S.LoadingText>로딩 중...</S.LoadingText>
          </S.LoadingContainer>
        )}
        <S.Title>
          <BiMailSend />
          {"\u00A0"}반품 신청
        </S.Title>
        <S.Form>
          {/* <S.FieldSet>
            <S.Label>제품명</S.Label>
            <S.Input readOnly value={item ? item.code : ""} />
          </S.FieldSet>
          <S.FieldSet>
            <S.Label>제품 ID</S.Label>
            <S.Input readOnly value={item ? item.id : ""} />
          </S.FieldSet>
          <S.FieldSet>
            <S.Label>수령일</S.Label>
            <S.Input readOnly value={item ? item.id : ""} />
          </S.FieldSet> */}
          <S.TextArea
            placeholder="반품 신청 사유를 입력하세요."
            value={requestReason}
            onChange={(e) => setRequestReason(e.target.value)}
          />
          <S.ButtonsWrap>
            <S.SubmitButton
              onClick={(e) => {
                handleSubmission(e);
              }}
            >
              신청
            </S.SubmitButton>
          </S.ButtonsWrap>
        </S.Form>
      </S.Wrap>
    </>
  );
};

const S = {
  LoadingContainer: styled.div`
    position: absolute; // 상대 위치 설정
    top: 10;
    left: 10;
    right: 10;
    bottom: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5); // 반투명 배경
  `,
  LoadingText: styled.div`
    margin-top: 20px;
    color: white;
    font-size: 18px;
  `,
  Wrap: styled.div`
    border: 1px solid #d3d3d3;
    margin: 20px;
    padding: 60px;
    padding-top: 20px; // 상단 navbar의 높이만큼 패딩을 줍니다.
    padding-left: 20px; // 왼쪽 navbar의 너비만큼 패딩을 줍니다.
    padding-right: 20px;
    border-radius: 10px;
    background-color: #f2f2f2;
    height: 80%;
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
    color: #1d1f25;
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
    width: 80px;
    cursor: pointer;
    height: 40px;
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

export default ReturnRequest;
