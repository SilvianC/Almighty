import React from "react";
import styled from "styled-components";
import ReasonIcon from "../../assets/images/icon-reason.png";

const RegistReason = ({ progressData, setProgressData }) => {
  return (
    <S.Wrap>
      <S.Title>
        <img src={ReasonIcon} alt="reason" />
        <p>신청 사유</p>
      </S.Title>
      <S.Reason>
        <span>
          {progressData != null
            ? progressData.reason
            : "선택된 배터리가 없습니다."}
        </span>
        <p>{progressData != null ? "(" + progressData.date + ")" : ""}</p>
      </S.Reason>
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div`
    width: 49%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `,
  Title: styled.div`
  display: flex;
  width: 20%;

    > img {
      width: 35px;
      height: 35px;
    }
    > p {
      color: #034f9e;
			font-size: 20px;
      font-weight: bold;
			margin-bottom: 0px;
      margin-left: 10px;
    }
  `,
  Reason: styled.div`
    background-color: #f2f2f2;
    width: 80%;
    height: 80px;
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
