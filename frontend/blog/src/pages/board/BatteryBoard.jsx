import React, { useEffect, useState } from "react";
import MetaGraph from "./../../components/graph/MetaGraph";
import TestGraph2 from "./../../components/graph/TestGraph2";
import MetaGraph2 from "../../components/graph/MetaGraph2";
import http from "../../api/http";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MetaGraphImpedance from "../../components/graph/MetaGraphImpedance";
import styled from "styled-components";

const BatteryBoard = () => {
  const [test, setTestData] = useState([]);
  const [data, setData] = useState([]);
  const [code, setCode] = useState("");
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
      .get(`/api/dashboard/batteries`)
      .then(({ data }) => {
        setBatteries(() => {
          return data["data"];
        });
      })
      .catch();
  }, []);

  useEffect(() => {
    if (code) {
      http
        .get(`/api/dashboard/${code}/tests/${testId}/testdatas`)
        .then(({ data }) => {
          setTestData(() => {
            return data["data"];
          });
        })
        .catch();
    }
  }, [testId]);

  useEffect(() => {
    if (!code && batteries.length) {
      setCode(() => batteries[0].code);
    }
  }, [batteries]);

  useEffect(() => {
    if (code) {
      http
        .get(`/api/dashboard/metadata/${code}`)
        .then(({ data }) => {
          setData(() => {
            return data["data"];
          });
        })
        .catch();
    }
  }, [code]);

  useEffect(() => {
    if (code) {
      if (testId === 0)
        http
          .get(`/api/dashboard/${code}/tests/0/testdatas`)
          .then(({ data }) => {
            setTestData(() => {
              return data["data"];
            });
          })
          .catch();
      else setTestId(() => 0);
    }
  }, [data]);
  return (
    <S.Wrap>
      <Row>
        <Col>
          <S.Title>배터리 데이터</S.Title>
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
        <Col md={5}>
          <MetaGraph2
            data={data}
            type="capacity"
            clickPoint={clickPoint}
          ></MetaGraph2>
          <MetaGraphImpedance data={data}></MetaGraphImpedance>
        </Col>
        <Col md={7}>
          <TestGraph2
            data={test}
            type={["voltageMeasured", "currentMeasured", "temperatureMeasured"]}
            num={testId}
          ></TestGraph2>
        </Col>
      </Row>
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div`
    border: 1px solid #d3d3d3;
    margin: 20px;
    padding: 20px;
    border-radius: 40px;
  `,
  Title: styled.span`
    font-size: 20px;
    font-weight: bold;
    color: #1428a0;
  `,
};
export default BatteryBoard;
