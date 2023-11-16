import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import http from "../../api/http";
import ReturnRequest from "../../components/returnrequest/ReturnRequest";
import Pagination from "../pagenation/Pagination";
import styled from "styled-components";

const BuyTable = ({
  data,
  onSuccess,
  onError,
  memberId,
  accessToken,
  setData,
}) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    http
      .get(`/api/batteries/member/${memberId}?page=${page - 1}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(({ data }) => {
        console.log(data);
        setData(data["data"]);
      })
      .catch((error) => {
        console.error("Error fetching batteries data", error);
      });
  }, [page]);

  return (
    <S.Wrap>
      {/* <S.Title className="d-flex align-items-center">
        <BsListUl />
        {"\u00A0"}
        배터리 목록 및 반송 신청
      </S.Title> */}
      <div className="Container">
        {data["content"] &&
          data["content"].map((item, idx) => {
            return (
              <div
                className={
                  item.status === "InProgress"
                    ? "flip-card1"
                    : item.status === "Analysis"
                    ? "flip-card1"
                    : item.status === "Return"
                    ? "flip-card1"
                    : "flip-card"
                }
              >
                {/* <div className="flip-card-upper"></div> */}
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <h1 style={{ marginTop: "25px", fontWeight: "bolder" }}>
                      {item.code}
                    </h1>
                    {/* <p>battery code</p> */}

                    {item.status === "InProgress" ? (
                      <CompletedButton disabled>진행 중</CompletedButton>
                    ) : item.status === "Analysis" ? (
                      <CompletedButton disabled>분석 중</CompletedButton>
                    ) : item.status === "Return" ? (
                      <CompletedButton disabled>반송 중</CompletedButton>
                    ) : (
                      <ApplyButton style={{ backgroundColor: "#AEC6DE"}}>신청</ApplyButton>
                    )}
                  </div>

                  <div className="flip-card-back">
                    <ReturnRequest
                      item={item}
                      onSuccess={onSuccess}
                      onError={onError}
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <Pagination
        total={data["totalPages"]}
        page={page}
        setPage={setPage}
      ></Pagination>
    </S.Wrap>
  );
};

export default BuyTable;

const CompletedButton = styled.div`
  font-weight: bold;
  width: 100%;
  height: 50px;
  padding: 2px;
  font-size: 30px;
  position: absolute;
  top: 50%;
`;

const ApplyButton = styled.div`
  width: 100%;
  height: 50px;
  font-weight: bold;
  font-size: 30px;
  padding: 2px;
  position: absolute;
  top: 50%;
`;

const S = {
  Wrap: styled.div`
    width: 92%;
    padding: 60px;
    padding-top: 20px;
    padding-left: 25px;
    padding-right: 10px;
    overflow: auto;
    height: 50%;

    background-color: #F2F2F2;
    box-shadow: 0px 2.77px 2.21px rgba(0, 0, 0, 0.0197),
      0px 12.52px 10.02px rgba(0, 0, 0, 0.035),
      0px 20px 80px rgba(0, 0, 0, 0.07);
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
    .flip-card {
      background-color: transparent;
      width: 18%;
      height: 400px;
      perspective: 1000px; /* Remove this if you don't want the 3D effect */
      margin: 13px;
      border-radius: 20px;
    }
    .flip-card1 {
      background-color: transparent;
      width: 18%;
      height: 400px;

      perspective: 1000px; /* Remove this if you don't want the 3D effect */
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
      border: 20px solid #212061;
      border-radius: 20px;
    }

    .flip-card:hover .flip-card-inner {
      transform: rotateY(180deg);
    }

    /* Position the front and back side */
    .flip-card-front,
    .flip-card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      -webkit-backface-visibility: hidden; /* Safari */
      backface-visibility: hidden;
    }

    .flip-card-front {
      background-color: #e7ecf2;
      color: black;
      div {
        background-color: #dedede;
        position: relative;
        // top: 130px;
      }
    }

    .flip-card-back {
      background-color: #e7ecf2;
      color: white;
      transform: rotateY(180deg);
    }
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
  Status: styled.span`
    font-size: 10px;
  `,
};
