import React, { forwardRef } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import styled from "styled-components";

const BmsGraph = ({ data }) => {
  const option = {
    chart: {
      backgroundColor: "#f2f2f2",
      type: "column",
      borderRadius: 25, // 틀을 둥글게 조절하는 값
      plotShadow: true, // 차트 영역에 그림자 표시 여부
    },
    accessibility: {
      enabled: false,
    },

    exporting: {
      enabled: false,
    },

    title: {
      text: ``,
    },

    subtitle: {
      text: "",
      align: "left",
    },

    plotOptions: {
      column: {
        minPointLength: 3, // 최소 높이 설정
      },
      label: {
        connectorAllowed: false,
      },
      line: {
        // 선 그래프에 대한 설정
        lineWidth: 2, // 선의 굵기 설정 (기본값은 2)
      },
    },
    yAxis: {
      min: 0, // 막대 그래프의 최소 값 설정

      title: {
        text: "Count",
      },
    },

    xAxis: { type: "category" },

    legend: {
      enabled: false, // 범례 비활성화
    },
    tooltip: {
      formatter: function () {
        return "<b>" + this.key + " : " + this.y + "</b>";
      },
    },
    series: [
      {
        colors: [
          data && data["overVoltageCount"] > 2 ? "#FF0000" : "#4589F4",
          data && data["underVoltageCount"] > 2 ? "#FF0000" : "#4589F4",
          data && data["overCurrentCount"] > 1 ? "#FF0000" : "#4589F4",
          data && data["overTemperatureCount"] > 2 ? "#FF0000" : "#4589F4",
          data && data["underTemperatureCount"] > 2 ? "#FF0000" : "#4589F4",
        ],
        colorByPoint: true,

        data: [
          ["과전압", data ? data["overVoltageCount"] : 0],
          ["저전압", data ? data["underVoltageCount"] : 0],
          ["과전류", data ? data["overCurrentCount"] : 0],
          ["고온도", data ? data["overTemperatureCount"] : 0],
          ["저온도", data ? data["underTemperatureCount"] : 0],
        ],
        dataLabels: {
          enabled: true,
          color: "#FFFFFF",
          align: "center",
          format: "{point.y:.f}", // one decimal
          y: 10, // 10 pixels down from the top
          style: {
            fontSize: "13px",
            fontFamily: "Verdana, sans-serif",
          },
        },
      },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {},
        },
      ],
    },
  };
  return (
    <S.Wrap>
      <div>
        <img src="BarChart.png" className="bar"></img>
        <p>BMS</p>
      </div>
      <HighchartsReact highcharts={Highcharts} options={option} />
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div`
    padding: 10px;
    z-index: 99;
    div {
      display: flex;
      flex-direction: row;
      .bar {
        width: 35px;
        height: 35px;
      }
    }
    div > p {
      color: #034f9e;
      margin-bottom: 0px;
      margin-left: 10px;
      font-weight: bold;
      font-size: 20px;
    }
  `,
};
export default BmsGraph;
