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
      <Row>
        <Col>
          <S.Title className="d-flex align-items-center">
            <BiSolidChart></BiSolidChart>배터리 데이터
          </S.Title>
          <select
            onChange={(e) => {
              handleCode(e);
            }}
          >
            {batteries.map((battery, idx) => {
              return (
                <option value={battery.code} key={idx}>
                  {battery.code}
                </option>
              );
            })}
          </select>
          <select
            onChange={(e) => {
              handleTest(e);
            }}
            value={testId}
          >
            {data.map((item, idx) => {
              return (
                <option value={item.testId} key={idx}>
                  {item.testId} : {item.type}
                </option>
              );
            })}
          </select>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <TestGraph
            data={vitData}
            threshold={battery}
            type={["voltageMeasured", "currentMeasured", "temperatureMeasured"]}
            num={testId}
          ></TestGraph>
        </Col>
        <Col md={8}>
          <BmsGraph></BmsGraph>
        </Col>
      </Row>
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div`
    border: 1px solid #d3d3d3;
    margin: 20px;
    padding: 60px;
    padding-top: 30px; // 상단 navbar의 높이만큼 패딩을 줍니다.
    padding-left: 50px; // 왼쪽 navbar의 너비만큼 패딩을 줍니다.
    border-radius: 40px;
  `,
  Title: styled.span`
    font-size: 20px;
    font-weight: bold;
    color: #1428a0;
  `,
};
export default BatteryBoard;
