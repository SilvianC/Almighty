import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import styled, { keyframes } from "styled-components";
import ReturnResponse from "../returnresponse/ReturnResponse";
import { CSSTransition } from "react-transition-group";
import { BsFillClipboard2CheckFill } from "react-icons/bs";
import http from "../../api/http";
import Pagination from "../pagenation/Pagination";
const status = {
  Normal: "정상",
  Request: "진행 중",
  Upload: "데이터 업로드",
  Analysis: "분석 중",
  CustomerFault: "고객 귀책",
  SdiFault: "제품 결함",
};

const ServiceHistory = ({
  data,
  page,
  setPage,
  totalPage,
  onStatusClick,
  fetchServiceHistory,
}) => {
  const [showReturnResponse, setShowReturnResponse] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const wrapperRef = useRef(null);
  const now = new Date();
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowReturnResponse(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleStatusButtonClick = (item) => {
    http
      .get(`/api/batteries/history/response/${item.historyId}`)
      .then((response) => {
        setSelectedItem({ ...item, responseData: response.data });
        setShowReturnResponse(true);
      })
      .catch((error) => {
        console.error("There was an error fetching the response", error);
      });
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
    fetchServiceHistory(pageNumber);
  };

  return (
    <S.Wrap ref={wrapperRef}>
      <div className="Container">
        {data.map((item, idx) => {
          const statusBackgroundColor =
            {
              Normal: "#DEDEDE", // 정상 - 회색
              Request: "#FAD551", // 진행 중 - 노란색
              Upload: "#B7C8D9", // 데이터 업로드 - 하늘색
              Analysis: "#034F9E", // 분석 중 - 파란색
              CustomerFault: "#D84848", // 고객 귀책 - 빨간색
              SdiFault: "#034F9E", // 제품 결함 - 파란색
            }[item.expertStatus] || "#1D1F25"; // 기본 - 회색

          const statusFontColor =
            {
              Normal: "#1D1F25", // 정상 - 검정색
              Request: "#FAD551", // 진행 중 - 노란색
              Upload: "#B7C8D9", // 데이터 업로드 - 하늘색
              Analysis: "#034F9E", // 분석 중 - 파란색
              CustomerFault: "#D84848", // 고객 귀책 - 빨간색
              SdiFault: "#034F9E", // 제품 결함 - 파란색
            }[item.expertStatus] || "#1D1F25"; // 기본 - 검정색

          const status =
            {
              Normal: "정상",
              Request: "진행 중",
              Upload: "데이터 업로드",
              Analysis: "분석 중",
              CustomerFault: "고객 귀책",
              SdiFault: "제품 결함",
            }[item.expertStatus] || "정상";

          const itemDate = new Date(item.date);
          const formattedDate = itemDate.toISOString().split("T")[0];
          const timeDifferenceInSeconds = Math.abs(now - itemDate) / 1000;
          const isRecent = timeDifferenceInSeconds <= 5;

          return (
            <div className="flip-card">
              <div className="flip-card-inner"
                style={{ borderTopColor: statusBackgroundColor }}
              >
                <div className="flip-card-front">
                  <h1 style={{ marginTop: "25px", fontWeight: "bolder", }}>{item.code}</h1>
                  <p>신청일자 {formattedDate}</p>
                  <h4 style={{ color: statusFontColor, }}>{status}</h4>
                </div>
                <div className="flip-card-back">
                  <ReturnResponse item={item} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <CSSTransition
        in={showReturnResponse}
        timeout={300}
        classNames="slide-down"
        unmountOnExit
        nodeRef={wrapperRef}
      >
        <S.ReturnResponseWrapper ref={wrapperRef}>
          <ReturnResponse
            onClose={() => setShowReturnResponse(false)}
            item={selectedItem}
            onSuccess={onStatusClick}
          />
        </S.ReturnResponseWrapper>
      </CSSTransition>

      <Pagination total={totalPage} page={page} setPage={setPage}></Pagination>
    </S.Wrap>
  );
};
export default ServiceHistory;

const S = {
  Wrap: styled.div`
  width: 92%;
  padding: 60px;
  padding-top: 20px;
  padding-left: 25px;
  padding-right: 10px;
  overflow: auto;
  height: 50%;
  background-color: #f2f2f2;
  box-sizing: content-box;
  border-radius: 10px;
  @media (max-width: 768px) {
    height: 300px;
    &::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none;
  }
    .Container {
      display: flex;
      flex-wrap: wrap;
      align-content: space-around;
      justify-content: center;
    }
    .Container {
      display: flex;
      flex-wrap: wrap;
      align-content: space-around;
      justify-content: center;
    }
    .flip-card {
      background-color: transparent;
      width: 15%;
      height: 200px;
      perspective: 1000px;
      margin: 13px;
      border-radius: 20px;
    }
    .flip-card1 {
      background-color: transparent;
      width: 18%;
      height: 400px;

      perspective: 1000px;
      margin: 13px;
      border-radius: 20px;
    }

    .flip-card-inner {
      position: relative;
      width: 100%;
      height: 100%;
      text-align: center;
      transition: transform 0.8s;
      transform-style: preserve-3d;
      // border: 20px solid #212061;
      border-radius: 10px;
      border-top: 13px solid;
    }

    .flip-card:hover .flip-card-inner {
      transform: rotateY(180deg);
    }

    .flip-card-front,
    .flip-card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
    }

    .flip-card-front {
      background-color: #e7ecf2;
      color: black;
      
      > h1 {
        font-size: 1.4rem;
      }
      > p {
        font-size: 1rem;
        color: #82858B;
      }
      > h4 {
        font-size: 1.4rem;
        font-weight: bold;
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .flip-card-back {
      background-color: #e7ecf2;
      color: black;
      transform: rotateY(180deg);
    }
  `,
  ReturnResponseWrapper: styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    right: 1px;
    z-index: 2;
  `,
  Title: styled.span`
    font-size: 30px;
    font-weight: bold;
    color: #1d1f25;
    padding-bottom: 10px;
    @media (max-width: 768px) {
      font-size: 20px;
    }
  `,
  PageArea: styled.div`
    text-align: center;
  `,
  PageBox: styled.span``,
  Table: styled(Table)`
    border-collapse: collapse;
    background-color: #f2f2f2;
    text-align: center;
    padding: 1px;
    thead tr,
    tbody tr {
      border: none !important;
      font-weight: bold;
      font-size: 18px;
    }
    tr:hover td {
      background: #e7ecf2 !important;
    }
    .flash-highlight {
      @keyframes fadeInOut {
        from,
        to {
          background-color: #f2f2f2;
        }
        50% {
          background-color: #5998da;
        }
      }
      animation: fadeInOut 0.8s !important;
    }
    th,
    td {
      border: none !important; // 모든 th, td 태그에 적용된 기본 선을 제거
      font-weight: bold;
      font-size: 18px;
      background-color: #f2f2f2;
    }

    th {
      background-color: #e7ecf2; // 하늘색 배경 적용
      color: #034f9e;
      font-weight: bold;
      font-size: 20px;
    }
  `,
};
// 페이징 컨트롤 스타일드 컴포넌트
const PageControl = styled.div`
  display: flex;
  justify-content: center;
  height: 40px;
`;

const PageButton = styled.button`
  padding: 5px 10px;
  background-color: ${(props) => (props.active ? "#007bff" : "transparent")};
  color: ${(props) => (props.active ? "white" : "black")};
  border: 1px solid #dee2e6;
  border-radius: 5px;
  cursor: pointer;
`;
