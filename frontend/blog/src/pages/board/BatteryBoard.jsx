import React, { useEffect, useRef, useState } from "react";
import MetaGraph from "./../../components/graph/MetaGraph";
import TestGraph from "./../../components/graph/TestGraph";
import http from "../../api/http";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MetaGraphImpedance from "../../components/graph/MetaGraphImpedance";
import styled from "styled-components";
import { BiSolidChart } from "react-icons/bi";
import BmsGraph from "../../components/graph/BmsGraph";

const match = {
  0: "voltageMeasured",
  1: "currentMeasured",
  2: "temperatureMeasured",
};
const BatteryBoard = ({ progressId, setProgress }) => {
  const [vitData, setVitData] = useState([]);
  const [bmsData, setBmsData] = useState([]);
  const [battery, setBattery] = useState([]);
  useEffect(() => {
    if (progressId != null) {
      http
        .get(`/api/dashboard/${progressId}`)
        .then(({ data }) => {
          setVitData(() => {
            return data["data"]["vitData"];
          });
          setBmsData(() => {
            return data["data"]["bmsData"];
          });
          setBattery(() => {
            console.log(data);
            return data["data"]["battery"];
          });
        })
        .catch(() => {
          setVitData(() => {
            return [];
          });
          setBmsData(() => {
            return [];
          });
          setProgress(() => {
            return null;
          });
        });
    }
  }, [progressId]);

  return (
    <S.Wrap>
      <Row>
        <Col md={12}>
          <TestGraph
            data={vitData}
            threshold={battery}
            type={["voltageMeasured", "currentMeasured", "temperatureMeasured"]}
          ></TestGraph>
        </Col>
        <Col md={12}>
          <BmsGraph data={bmsData}></BmsGraph>
        </Col>
      </Row>
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div`
    border: 1px solid #d3d3d3;
    // margin: 20px;
    // padding: 60px;
    // padding-top: 30px; // 상단 navbar의 높이만큼 패딩을 줍니다.
    // padding-left: 50px; // 왼쪽 navbar의 너비만큼 패딩을 줍니다.
    border-radius: 10px;
    // width: 300px;
  `,
  Title: styled.span`
    font-size: 20px;
    font-weight: bold;
    color: #1428a0;
  `,
};
export default BatteryBoard;
