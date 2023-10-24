import React, { useEffect, useState } from "react";
import BuyTable from "../../components/table/BuyTable";
import styled from "styled-components";
import { BsPencilSquare } from "react-icons/bs";

const Return = () => {
  return (
    <S.Container>
      <S.Title>
        <BsPencilSquare></BsPencilSquare>
        반품 요청
      </S.Title>
      <BuyTable></BuyTable>
    </S.Container>
  );
};

export default Return;
const S = {
  Container: styled.div``,
  Title: styled.div`
    font-size: 30px;
    font-weight: bold;
    color: #1428a0;
  `,
};
