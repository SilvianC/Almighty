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
                <div className="flip-card-upper">
                  <div className="flip-card-upper-box">.</div>
                </div>
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <h1 style={{ marginTop: "15px", fontWeight: "bolder" }}>
                      {item.code}
                    </h1>
                    {item.modelName}

                    {item.status === "InProgress" ? (
                      <CompletedButton disabled>진행 중</CompletedButton>
                    ) : item.status === "Analysis" ? (
                      <CompletedButton disabled>분석 중</CompletedButton>
                    ) : item.status === "Return" ? (
                      <CompletedButton disabled>반송 중</CompletedButton>
                    ) : (
                      <ApplyButton style={{ backgroundColor: "#C7CFD7"}}>신청</ApplyButton>
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
  font-size: 1.7rem;
  position: absolute;
  top: 61.5%;
`;

const ApplyButton = styled.div`
  width: 100%;
  height: 50px;
  font-weight: bold;
  font-size: 1.7rem;
  padding: 2px;
  position: absolute;
  top: 61.5%;
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
      width: 15%;
      height: 300px;
      perspective: 1000px;
      margin: 13px;
      border-radius: 20px;
      margin-bottom: 60px;
    }
    .flip-card1 {
      background-color: transparent;
      width: 15%;
      height: 300px;
      perspective: 1000px;
      margin: 13px;
      border-radius: 20px;
      margin-bottom: 60px;
    }

    .flip-card-upper {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      transition: transform 0.8s;
      transform-style: preserve-3d;
    }

    .flip-card-upper-box {
      width: 40%;
      height: 2rem;
      background-color: #a0adba;
      color: #212061;
      transition: transform 0.8s;
      transform-style: preserve-3d;
    }

    .flip-card:hover .flip-card-upper-box {
      transform: rotateY(180deg);
    }

    .flip-card-inner {
      position: relative;
      width: 100%;
      height: 100%;
      text-align: center;
      transition: transform 0.8s;
      transform-style: preserve-3d;
      border-top: 1rem solid #a0adba;
      border-bottom: 1rem solid #a0adba;
      border-left: 1.5rem solid #a0adba;
      border-right: 1.5rem solid #a0adba;
      border-radius: 20px;
    }

    .flip-card:hover .flip-card-inner {
      transform: rotateY(180deg);
    }

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

      > h1 {
        font-size: 1.2rem;
      }
      div {
        background-color: #BED6C7;
        position: relative;
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
