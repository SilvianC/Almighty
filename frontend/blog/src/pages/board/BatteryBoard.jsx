import React, { useEffect, useState } from "react";
import MetaGraph from "./../../components/graph/MetaGraph";
import TestGraph from "./../../components/graph/TestGraph";
import MetaGraph2 from "../../components/graph/MetaGraph2";
import http from "../../api/http";

const BatteryBoard = () => {
  const [test, setTestData] = useState([]);
  const [data, setData] = useState([]);
  const [code, setCode] = useState("B0047");
  const [testId, setTestId] = useState(0);
  const clickPoint = (id) => {
    setTestId(() => id);
  };
  useEffect(() => {
    http
      .get(`/api/dashboard/metadata/${code}`)
      .then(({ data }) => {
        setData(() => {
          return data["data"];
        });
      })
      .catch();

    http
      .get(`/api/dashboard/${code}/tests/${0}/testdatas`)
      .then(({ data }) => {
        setTestData(() => {
          return data["data"];
        });
      })
      .catch();
  }, []);

  useEffect(() => {
    http
      .get(`/api/dashboard/${code}/tests/${testId}/testdatas`)
      .then(({ data }) => {
        setTestData(() => {
          return data["data"];
        });
      })
      .catch();
  }, [testId]);
  return (
    <>
      <MetaGraph2
        data={data}
        type="capacity"
        clickPoint={clickPoint}
      ></MetaGraph2>
      <TestGraph data={test} type="voltageMeasured"></TestGraph>
      <br/>
      <MetaGraph data={data} type="capacity"></MetaGraph>
      <MetaGraph data={data} type="re"></MetaGraph>
    </>
  );
};
export default BatteryBoard;
