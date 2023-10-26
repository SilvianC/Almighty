import React, { useEffect, useState } from "react";
import BuyTable from "../../components/table/BuyTable";
import styled from "styled-components";
import { BsPencilSquare } from "react-icons/bs";
import http from "../../api/http";
import { useRecoilValue } from "recoil";
import { MemberIdState } from "../../states/states";

const Return = () => {
  const [data, setData] = useState([]);
  // const memberId = useRecoilValue(MemberIdState);
  const memberId = 1;
  useEffect(() => {
    http
      .get(`/api/batteries/member/${memberId}`)
      .then(({ data }) => {
        setData(() => {
          return data["data"];
        });
      })
      .catch();
  }, []);

  return (
    <S.Container>
      <S.Title>
        <BsPencilSquare></BsPencilSquare>
        반품 요청
      </S.Title>
      <BuyTable data={data}></BuyTable>
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
