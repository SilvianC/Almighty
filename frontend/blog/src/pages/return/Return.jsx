import React, { useEffect, useState } from "react";
import BuyTable from "../../components/table/BuyTable";
import styled from "styled-components";
import http from "../../api/http";
import ServiceHistory from "../../components/servicehistory/ServiceHistory";

const Return = () => {
  const [data, setData] = useState([]);
  const [history, setHistory] = useState([]);
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
    http
      .get(`/api/batteries/history/members/${memberId}`)
      .then(({ data }) => {
        setHistory(() => {
          return data["data"]["content"];
        });
      })
      .catch();
  }, []);

  return (
    <S.Container>
      <S.BuyTableContainer>
        <BuyTable data={data}></BuyTable>
      </S.BuyTableContainer>

      <S.ReturnResultTableContainer>
        <ServiceHistory data={history}></ServiceHistory>
      </S.ReturnResultTableContainer>
    </S.Container>
  );
};

export default Return;
const S = {
  Container: styled.div`
    display: flex;
    width:100%;
  `,
  BuyTableContainer: styled.div`
    flex: 1;
  `,
  ReturnResultTableContainer: styled.div`
    flex: 0.65;
  `,
  Title: styled.div`
    font-size: 30px;
    font-weight: bold;
    color: #1428a0;
  `,
};
