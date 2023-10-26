import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsPencilSquare } from "react-icons/bs";
import ReturnConfirmTable
 from "../../components/table/ReturnConfirmTable";
const ReturnConfirm = ()=>{
    return(
        <S.Container>
            <S.Title>
            <BsPencilSquare></BsPencilSquare>
                반품 요청 목록
            </S.Title>
            <ReturnConfirmTable></ReturnConfirmTable>
        </S.Container>
    );
};

export default ReturnConfirm;

const S = {
    Container: styled.div``,
    Title: styled.div`
      font-size: 30px;
      font-weight: bold;
      color: #1428a0;
    `,
  };