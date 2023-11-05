import React, { useEffect, useState } from "react";
import * as components from "../../components";
import { BsPencilSquare } from "react-icons/bs";
import styled from "styled-components";
import AlarmTable from "../../components/alarm/AlarmTable";
import http from "../../api/http";
import AlarmModal from "../../components/alarm/AlarmModal";
// import "./ServiceHistory.css";

// const data = [
//   // 데이터 배열 예시
//   {
//     BatteryName: "1",
//     BuyerName: "삼성전자",
//     RequestDate: "2023-10-25",
//     CurrentStatus: "요청",
//   },
//   {
//     BatteryName: "2",
//     BuyerName: "삼성전자",
//     RequestDate: "2023-10-25",
//     CurrentStatus: "요청",
//   },
//   {
//     BatteryName: "3",
//     BuyerName: "삼성전기",
//     RequestDate: "2023-10-24",
//     CurrentStatus: "답변 완료",
//   },
//   {
//     BatteryName: "4",
//     BuyerName: "삼성전기",
//     RequestDate: "2023-10-26",
//     CurrentStatus: "분석 중",
//   },
//   {
//     BatteryName: "5",
//     BuyerName: "삼성전자",
//     RequestDate: "2023-10-26",
//     CurrentStatus: "분석 중",
//   },
//   // 추가 데이터
// ];
// const columns = [
//   // 칼럼 정의
//   { Header: "제품명", accessor: "BatteryName" },
//   { Header: "고객사명", accessor: "BuyerName" },
//   { Header: "반송신청일자", accessor: "RequestDate" },
//   { Header: "진행상태", accessor: "CurrentStatus" },
//   // 추가 칼럼
// ];

const ServiceHistory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(!isModalOpen);
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  useEffect(() => {
    http
      .get(`/api/batteries/history/all`)
      .then(({ data }) => {
        setHistory(() => {
          return data["data"]["content"];
        });
        setPage(() => 0);
        setTotalPage(() => data["data"]["totalPages"]);
      })
      .catch();
  }, []);
  return (
    <S.Container>
      <S.Title>
        <BsPencilSquare /> 서비스 이용내역
      </S.Title>
      <S.Content>
        <S.AlarmWrapper>
          <div>
            <button onClick={openModal}>
              <img className="phoneImage" alt="iPhone_01" src="bluebell.png" />
            </button>
            <AlarmModal isOpen={isModalOpen} />
          </div>
        </S.AlarmWrapper>
        <S.ServiceHistoryWrapper>
          <components.ServiceHistory
            data={history}
            page={page}
            totalPage={totalPage}
            setPage={setPage}
          />
        </S.ServiceHistoryWrapper>
      </S.Content>
    </S.Container>
  );
};

export default ServiceHistory;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column; // 수직 방향으로 컴포넌트 배치
  `,
  Title: styled.div`
    font-size: 30px;
    font-weight: bold;
    color: #1428a0;
  `,
  Content: styled.div`
    display: flex; // Flexbox를 활성화
    justify-content: space-between; // 컴포넌트들 사이에 간격을 줍니다.
  `,
  AlarmWrapper: styled.div`
    flex: 1; // 비율을 1로 설정 (즉, 전체 너비의 50% 차지)
    margin-right: 10px; // 오른쪽에 약간의 간격을 줍니다.
  `,
  ServiceHistoryWrapper: styled.div`
    flex: 2; // 비율을 2로 설정 (즉, 전체 너비의 50% 차지)
  `,
};
