import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsFillBellFill } from "react-icons/bs";
import { getalarmlog } from "../../api/alarm";
import Pagination from "../pagenation/Pagination";
const AlarmTable = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [toggle, setToggle] = useState(false);
  function handle(toggle) {
    setToggle(!toggle);
  }
  useEffect(() => {
    getalarmlog(
      "관리자",
      page,
      ({ data }) => {
        setData(() => {
          return data.data;
        });
        setPage(() => {
          return data.number + 1;
        });
        setTotal(() => {
          return data.totalPages;
        });
      },
      ({ error }) => {
        console.log(error);
      }
    );
  }, [page]);

  return (
    <S.Wrap>
      <S.Title className="d-flex align-items-center">
        <BsFillBellFill />
        알림 내역
      </S.Title>

      <table>
        <tbody>
          {data.map(({ title, time, content, isRead, company }) => {
            const formattedTime = new Date() - new Date(time);
            const daysDifference = formattedTime / (1000 * 60 * 60 * 24); // 하루
            const days = Math.floor(daysDifference); // 하루
            const hours = Math.floor((daysDifference - days) * 24); //시간
            return (
              <>
                <tr>
                  <td>{"이미지"}</td>
                  <td>
                    <button onClick={() => handle(toggle)}>
      
                      {`[${title}]`}
                    </button>
                  </td>
                  <td>{`${company}으로 반송신청 들어옴`}</td>
                  <td> {` ${days} 일 ${hours} 시간 전.`}</td>
                  <td> {!isRead ? "미확인" : "확인 완료"}</td>
                </tr>
                {toggle && (
                  <>
                    <tr>
                      <S.TR>{content}</S.TR>
                    </tr>
                    <tr>
                      <td colSpan={5}>{"확인"}</td>
                    </tr>
                  </>
                )}
              </>
            );
          })}
        </tbody>
      </table>

      <footer>
        <Pagination total={total} page={page} setPage={setPage} />
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
  TR: styled.tr`
   height :50
   colSpan :5

  `,
};
