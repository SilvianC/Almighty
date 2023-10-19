import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const MetaGraphImpedance = ({ data }) => {
  const filter = data.filter(
    (item) => Object.keys(item).includes("re") && item["re"]
  );
  const d = filter.map((item) => {
    return [item["testId"], item["re"]];
  });
  const d2 = filter.map((item) => {
    return [item["testId"], item["rct"]];
  });

  const option = {
    title: {
      text: "Impedance Battery Metadata",
      align: "center",
      style: {
        color: "#4F84C9", // 원하는 색상으로 설정
      },
      align: "center",
      style: {
        color: "#4F84C9", // 원하는 색상으로 설정
      },
    },

    subtitle: {
      text: "",
      align: "left",
    },

    yAxis: {
      title: {
        text: "Ohms",
      },
    },

    xAxis: {
      title: {
        text: "Test",
      },
      // categories: x,
    },

    legend: {
      floating: true, // 레전드를 그래프 위에 표시
      layout: "horizontal",
      layout: "horizontal",
      align: "right",
      verticalAlign: "top",
      y: 15,
      y: 15,
    },

    plotOptions: {
      label: {
        connectorAllowed: false,
      },
    },

    series: [
      {
        name: "Re",
        data: d,
      },
      {
        name: "Rct",
        data: d2,
      },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            // legend: {
            //   layout: "vertical",
            //   align: "right",
            //   verticalAlign: "top",
            // },
          },
        },
      ],
    },
  };
  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={option} />
    </>
  );
};
export default MetaGraphImpedance;
