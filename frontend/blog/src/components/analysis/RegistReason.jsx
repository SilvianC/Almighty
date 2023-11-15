import React from "react";
import styled from "styled-components";

const RegistReason = ({ progressData, setProgressData }) => {
  return (
    <S.Wrap>
      <S.Title>
        <p>신청 사유</p>
      </S.Title>
      <S.Reason>
        <span>
          {progressData != null
            ? progressData.reason
            : "선택된 베터리가 없습니다."}
        </span>
        <p>{progressData != null ? "(" + progressData.date + ")" : ""}</p>
      </S.Reason>
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div`
    width: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  Title: styled.div`
    > p {
      color: #1d1f25;
      font-size: 18px;
      margin: 0px;
    }
  `,
  Reason: styled.div`
    background-color: #f2f2f2;
    width: 85%;
    height: 100px;
    border-radius: 10px;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 0px 2.77px 2.21px rgba(0, 0, 0, 0.0197),
      0px 12.52px 10.02px rgba(0, 0, 0, 0.035),
      0px 20px 80px rgba(0, 0, 0, 0.07);

    > span {
      margin-left: 20px;
      margin-bottom: 5px;
      color: #82858b;
      font-size: 18px;
      font-weight: bold;
    }
    > p {
      margin-left: 20px;
      margin-bottom: 0px;
      color: #b9b9b9;
      font-size: 17px;
    }
  `,
};

export default RegistReason;
