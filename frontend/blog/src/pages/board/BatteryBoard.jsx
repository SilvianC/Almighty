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
const BatteryBoard = () => {
  const [vitData, setVitData] = useState([]);
  const [bmsData, setBmsData] = useState([]);
  const [data, setData] = useState([]);
  const [code, setCode] = useState("");
  const [battery, setBattery] = useState([]);
  const [batteries, setBatteries] = useState([]);
  const [testId, setTestId] = useState(0);

  const clickPoint = (id) => {
    setTestId(() => id);
  };
  const handleCode = (e) => {
    setCode(() => e.target.value);
  };
  const handleTest = (e) => {
    setTestId(() => e.target.value);
  };
  useEffect(() => {
    http
      .get(`/api/batteries`)
      .then(({ data }) => {
        setBatteries(() => {
          return data["data"];
        });
      })
      .catch();
    http
      .get(`/api/dashboard/6`)
      .then(({ data }) => {
        setVitData(() => {
          return data["data"]["vitData"];
        });
        setBmsData(() => {
          return data["data"]["bmsData"];
        });
      })
      .catch();
  }, []);

  useEffect(() => {
    if (!code && batteries.length) {
      setCode(() => batteries[0].code);
    }
  }, [batteries]);

  useEffect(() => {
    if (code) {
      http
        .get(`/api/batteries/battery/${code}`)
        .then(({ data }) => {
          setBattery(() => {
            return data["data"];
          });
        })
        .catch();
    }
  }, [code]);

  return (
    <S.Wrap>
      <Info>hihi</Info>
      <TestGraph
        data={vitData}
        threshold={battery}
        type={["voltageMeasured", "currentMeasured", "temperatureMeasured"]}
        num={testId}
      ></TestGraph>
      <Info>hihids;fsdfdj</Info>
      <BmsGraph data={bmsData}></BmsGraph>
    </S.Wrap>
  );
};

const Info = styled.div`
  position: absolute;
  background-color: gray;
  width: 200px;
  height: 200px;
  z-index: 99;
  padding: 10px;
  margin: 50px;
`;

const S = {
  Wrap: styled.div`
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    width: 100%;
  `,
  Title: styled.span`
    font-size: 20px;
    font-weight: bold;
    color: #1428a0;
  `,
};
export default BatteryBoard;
