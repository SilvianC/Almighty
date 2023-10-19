import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const MetaGraph2 = ({ data, type, clickPoint }) => {
  const filter = data.filter(
    (item) => Object.keys(item).includes("capacity") && item["capacity"]
  );
  const d = filter.map((item) => {
    return [item["testId"], item["capacity"]];
  });

  const option = {
    title: {
      text: "Discharge Battery Metadata",
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
        text: "Capacity",
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
      align: "right",
      verticalAlign: "top",
      y: 15, // y 좌표를 조절
    },

    plotOptions: {
      label: {
        connectorAllowed: false,
      },
    },

    series: [
      {
        name: "Capacity",
        data: d,
        // marker: {
        //   symbol: "square", // 점을 사각형으로 설정
        //   enabled: true, // 점을 표시할지 여부를 설정합니다.
        //   radius: 4, // 점의 반지름 설정
        // },
        point: {
          events: {
            click: function () {
              clickPoint(this.x);
            },
          },
        },
        marker: {
          enabled: false,
        },
      },

      {
        type: "line",
        name: "Regression Line",
        data: [d[0], d[d.length - 1]],
        marker: {
          enabled: false,
        },
        states: {
          hover: {
            lineWidth: 3,
          },
        },
        enableMouseTracking: false,
      },
    ],

    responsive: {
      //반응형 처리에 필요
      rules: [
        {
          //반응 조건
          condition: {
            maxWidth: 500,
          },
          //반응 동작
          chartOptions: {
            legend: {
              layout: "vertical",
              align: "right",
              verticalAlign: "top",
            },
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
export default MetaGraph2;
