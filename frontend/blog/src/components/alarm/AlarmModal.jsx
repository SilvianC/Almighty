import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import AlarmTable from "./AlarmTable";
import { constSelector, useRecoilValue } from "recoil";
import { MemberIdState } from "../../states/states";
import { updateAlarm } from "../../api/alarm";

const AlarmModal = ({
  isOpen,
  setCount,
  count,
  setModalOpen,
  modalRef,
  modalOutSideClick,
}) => {
  const memberId = useRecoilValue(MemberIdState);
  if (isOpen && count != 0) {
    updateAlarm(
      memberId,
      ({ data }) => {
        console.log(data);
        setCount(0);
      },
      ({ error }) => {
        console.log(error);
      }
    );
  }
  if (isOpen) {
    document.addEventListener("mouseup", (event) => {
      var table = document.querySelector(".help");
      console.log(event);
      if (!table.contains(event.target)) {
        setModalOpen(!isOpen);
      }
    });
  }

  return (
    <S.live style={{ display: isOpen ? "block" : "none" }} className="help">
      <AlarmTable></AlarmTable>
    </S.live>
  );
};

export default AlarmModal;

const S = {
  Wrap: styled.div`
    border: 1px solid #d3d3d3;
    margin: 20px;
    padding: 60px;
    padding-top: 30px; // 상단 navbar의 높이만큼 패딩을 줍니다.
    padding-left: 50px; // 왼쪽 navbar의 너비만큼 패딩을 줍니다.
    border-radius: 40px;
    min-height: calc(
      100vh - 120px
    ); // 화면의 높이에서 마진 20px * 2를 뺀 높이로 설정
  `,
  Title: styled.span`
    font-size: 20px;
    font-weight: bold;
    color: #1428a0;
    padding-bottom: 30px;
  `,
  Table: styled.table`
    tablelayout: "fixed";
  `,
  live: styled.div`
    position: fixed;
    top: 50px;
    right: 130px;
  `,
};
