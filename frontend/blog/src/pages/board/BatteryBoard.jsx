import React, { useEffect, useState } from "react";
import MetaGraph from "./../../components/graph/MetaGraph";
import TestGraph from "./../../components/graph/TestGraph";
import MetaGraph2 from "../../components/graph/MetaGraph2";
import http from "../../api/http";

const BatteryBoard = () => {
  const [test, setTestData] = useState([]);
  const [data, setData] = useState([]);
  const [code, setCode] = useState("B0047");
  const uid = 1;

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
      .get(`/api/dashboard/${uid}/testdatas`)
      .then(({ data }) => {
        setTestData(() => {
          return data["data"];
        });
      })
      .catch();
  }, []);
  return (
    <>
      <MetaGraph data={data} type="capacity"></MetaGraph>
      <MetaGraph data={data} type="re"></MetaGraph>
      <MetaGraph2 data={data} type="capacity"></MetaGraph2>
      <TestGraph data={test} type="voltageMeasured"></TestGraph>
    </>
  );
};
export default BatteryBoard;
