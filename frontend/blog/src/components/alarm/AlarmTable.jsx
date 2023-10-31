import React, { Fragment, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import { BsFillBellFill } from "react-icons/bs";
import { getalarmlog } from "../../api/alarm";
import Pagination from "../pagenation/Pagination";
const AlarmTable = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [limit, setLimit] = useState(1);

  useEffect(() => {
    getalarmlog(
      "관리자",
      page,
      ({ data }) => {
        console.log(data);
        setData(() => {
          return data.data;
        });
        setPage(() => {
          return data.totalPages;
        });
        setTotal(() => {
          return data.totalPages;
        });
      },
      ({ error }) => {
        console.log(error);
      }
    );
  }, page);

  return (
    <S.Wrap>
      <S.Title className="d-flex align-items-center">
        <BsFillBellFill />
        알림 내역
      </S.Title>
      <Form>
        <main>
          {data.map(({ title, time, content }) => {
            const formattedTime = new Date(time).toLocaleString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <article>
                <h3>{title}</h3>
                <p>
                  {content} {formattedTime}
                </p>
              </article>
            );
          })}
        </main>
      </Form>

      <footer>
        <Pagination total={total} limit={limit} page={page} setPage={setPage} />
      </footer>
    </S.Wrap>
  );
};

export default AlarmTable;

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
};
