import React, { useEffect, useState } from "react";
import MetaGraph from "./../../components/graph/MetaGraph";
import TestGraph2 from "./../../components/graph/TestGraph2";
import MetaGraph2 from "../../components/graph/MetaGraph2";
import http from "../../api/http";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MetaGraphImpedance from "../../components/graph/MetaGraphImpedance";

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
    console.log(e.target.value);
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
  return (
    <>
      <Container>
        <h1>배터리 그래프</h1>
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
        <Row>
          <Col md={6}>
            <MetaGraph2
              data={data}
              type="capacity"
              clickPoint={clickPoint}
            ></MetaGraph2>
          </Col>
          <Col md={6}>
            <MetaGraphImpedance data={data}></MetaGraphImpedance>
          </Col>
        </Row>
        <Row>
          <Col>
            <TestGraph2
              data={test}
              type={[
                "voltageMeasured",
                "currentMeasured",
                "temperatureMeasured",
              ]}
              num={testId}
            ></TestGraph2>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default BatteryBoard;
