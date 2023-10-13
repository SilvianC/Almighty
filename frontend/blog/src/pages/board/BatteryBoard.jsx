import React, { useEffect, useState } from "react";
import MetaGraph from "./../../components/graph/MetaGraph";
import TestGraph from "./../../components/graph/TestGraph";
import http from "../../api/http";

const ddata = [
  {
    type: "discharge",
    start_time: "[2010.       7.      21.      15.       0.      35.093]",
    ambient_temperature: 4,
    battery_id: "B0047",
    test_id: 0,
    uid: 1,
    Capacity: 1.674304745,
    Re: null,
    Rct: null,
  },
  {
    type: "impedance",
    start_time: "[2010.       7.      21.      16.      53.      45.968]",
    ambient_temperature: 24,
    battery_id: "B0047",
    test_id: 1,
    uid: 2,
    Re: 0.056057833,
    Rct: 0.200970166,
  },
  {
    type: "charge",
    start_time: "[2010.       7.      21.      17.      25.      40.671]",
    ambient_temperature: 4,
    battery_id: "B0047",
    test_id: 2,
    uid: 3,
    Capacity: null,
    Re: null,
    Rct: null,
  },
  {
    type: "impedance",
    start_time: "[2010    7   21   20   31    5]",
    ambient_temperature: 24,
    battery_id: "B0047",
    test_id: 3,
    uid: 4,
    Re: 0.053191859,
    Rct: 0.164733999,
  },
  {
    type: "discharge",
    start_time:
      "[2.0100e+03 7.0000e+00 2.1000e+01 2.1000e+01 2.0000e+00 5.6984e+01]",
    ambient_temperature: 4,
    battery_id: "B0047",
    test_id: 4,
    uid: 5,
    Capacity: 1.524366211,
    Re: null,
    Rct: null,
  },
  {
    type: "charge",
    start_time: "[2010.       7.      21.      22.      38.      43.484]",
    ambient_temperature: 4,
    battery_id: "B0047",
    test_id: 5,
    uid: 6,
    Capacity: null,
    Re: null,
    Rct: null,
  },
  {
    type: "discharge",
    start_time: "[2.010e+03 7.000e+00 2.200e+01 1.000e+00 4.000e+01 6.218e+00]",
    ambient_temperature: 4,
    battery_id: "B0047",
    test_id: 6,
    uid: 7,
    Capacity: 1.508076297,
    Re: null,
    Rct: null,
  },
  {
    type: "charge",
    start_time: "[2010.       7.      22.       3.      14.      53.218]",
    ambient_temperature: 4,
    battery_id: "B0047",
    test_id: 7,
    uid: 8,
    Capacity: null,
    Re: null,
    Rct: null,
  },
  {
    type: "discharge",
    start_time: "[2010.       7.      22.       6.      16.      21.781]",
    ambient_temperature: 4,
    battery_id: "B0047",
    test_id: 8,
    uid: 9,
    Capacity: 1.483557796,
    Re: null,
    Rct: null,
  },
  {
    type: "charge",
    start_time: "[2010.       7.      22.       7.      50.      21.625]",
    ambient_temperature: 4,
    battery_id: "B0047",
    test_id: 9,
    uid: 10,
    Capacity: null,
    Re: null,
    Rct: null,
  },
  {
    type: "discharge",
    start_time: "[2010.       7.      22.      10.      51.      48.203]",
    ambient_temperature: 4,
    battery_id: "B0047",
    test_id: 10,
    uid: 11,
    Capacity: 1.467139167,
    Re: null,
    Rct: null,
  },
  {
    type: "charge",
    start_time: "[2010.       7.      22.      12.      25.       3.656]",
    ambient_temperature: 4,
    battery_id: "B0047",
    test_id: 11,
    uid: 12,
    Capacity: null,
    Re: null,
    Rct: null,
  },
  {
    type: "discharge",
    start_time: "[2010.       7.      22.      15.      26.      29.359]",
    ambient_temperature: 4,
    battery_id: "B0047",
    test_id: 12,
    uid: 13,
    Capacity: 1.448858157,
    Re: null,
    Rct: null,
  },
  {
    type: "impedance",
    start_time: "[2010.       7.      22.      17.       3.       7.062]",
    ambient_temperature: 24,
    battery_id: "B0047",
    test_id: 13,
    uid: 14,
    Re: 0.059637915,
    Rct: 0.210398723,
  },
  {
    type: "charge",
    start_time: "[2010.       7.      22.      17.      34.      59.312]",
    ambient_temperature: 4,
    battery_id: "B0047",
    test_id: 14,
    uid: 15,
    Capacity: null,
    Re: null,
    Rct: null,
  },
];

const dtest = [
  {
    Voltage_measured: 4.246711254,
    Current_measured: 0.000252389,
    Temperature_measured: 6.212696116,
    Current_load: 0.0002,
    Voltage_load: 0,
    Time: 0,
  },
  {
    Voltage_measured: 4.246764126,
    Current_measured: -0.001411065,
    Temperature_measured: 6.23401887,
    Current_load: 0.0002,
    Voltage_load: 4.262,
    Time: 9.36,
  },
  {
    Voltage_measured: 4.039277018,
    Current_measured: -0.995093412,
    Temperature_measured: 6.250254736,
    Current_load: 1,
    Voltage_load: 3.465,
    Time: 23.281,
  },
  {
    Voltage_measured: 4.019506433,
    Current_measured: -0.99673106,
    Temperature_measured: 6.302175659,
    Current_load: 1,
    Voltage_load: 3.451,
    Time: 36.406,
  },
  {
    Voltage_measured: 4.004763261,
    Current_measured: -0.992844635,
    Temperature_measured: 6.361644678,
    Current_load: 1,
    Voltage_load: 3.438,
    Time: 49.625,
  },
];

const BatteryBoard = () => {
  const [test, setTestData] = useState(dtest);
  const [data, setData] = useState(ddata);
  // http
  //   .get(`url`)
  //   .then(({ data }) => {
  //     setData(() => {
  //       return data;
  //     });
  //   })
  //   .catch();
  return (
    <>
      <MetaGraph data={data} type="Capacity"></MetaGraph>
      <MetaGraph data={data} type="Re"></MetaGraph>
      <TestGraph data={test} type="Voltage_measured"></TestGraph>
    </>
  );
};
export default BatteryBoard;
