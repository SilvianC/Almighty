import React, {
  useImperativeHandle,
  forwardRef,
  useRef,
  useEffect,
} from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import styled from "styled-components";

const transName = {
  voltageMeasured: "전압(Volts)",
  currentMeasured: "전류(Amps)",
  temperatureMeasured: "온도(°C)",
};

const TestGraph = ({ data, threshold, type, num }) => {
  const datas = [];

  for (const t of type) {
    const arr = data.map((item) => item[t]);
    const result = arr.reduce(
      (acc, current, index, array) => {
        if (current >= 10.5 && (index === 0 || array[index - 1] < 10.5)) {
          acc.start.push(index);
        } else if (current <= 10.5 && index > 0 && array[index - 1] > 10.5) {
          acc.end.push(index - 1);
        }
        return acc;
      },
      { start: [], end: [] }
    );
    const newData = {
      name: transName[t],
      yAxis: 0,
      turboThreshold: 10000,
      data: data.map((item, idx) => {
        return {
          x: item["time"] * 3600,
          y: item[t],
          marker: {
            enabled: result.start.includes(idx) || result.end.includes(idx),
          },
        };
      }),
      zones:
        t === "temperatureMeasured"
          ? [
              {
                value: 10.5,
                color: "green",
              },
              {
                color: "red",
              },
            ]
          : t === "voltageMeasured"
          ? [
              {
                color: "blue",
              },
              {
                value: threshold.underVoltage,
                color: "red",
              },
            ]
          : null,
      marker: {
        enabled: false, // 초기에 모든 심볼 비활성화
        states: {
          hover: {
            enabled: true, // 마우스 호버시 심볼 활성화
          },
        },
      },
    };
    datas.push(newData);
  }

  const option = {
    chart: {},
    accessibility: {
      enabled: false,
    },

    exporting: {
      enabled: false,
    },
    title: {
      text: `VIT`,
      align: "left",
      style: {
        color: "#4F84C9", // 원하는 색상으로 설정
      },
    },

    subtitle: {
      text: "",
      align: "left",
    },

    yAxis: [
      {
        title: {
          // text: "Capacity",
        },
      },
      {
        title: {
          text: "잔량(%)",
        },
        opposite: true,
      },
    ],

    xAxis: {
      title: {
        text: "Time",
      },

      // categories: x,
    },

    legend: {
      floating: false, // 레전드를 그래프 위에 표시
      layout: "horizontal",
      align: "right",
      verticalAlign: "top",
      y: 15,
    },

    plotOptions: {
      label: {
        connectorAllowed: false,
      },
      line: {
        // 선 그래프에 대한 설정
        lineWidth: 2, // 선의 굵기 설정 (기본값은 2)
      },
    },

    series: [
      ...datas,
      {
        name: "잔량(%)",
        yAxis: 1,
        data: [
          [1000, 5],
          [2000, 10],
          [3000, 20],
          [5000, 40],
          [6000, 60],
        ],
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            // maxWidth: 500,
          },
          chartOptions: {
            // legend: {
            //   layout: "horizontal",
            //   align: "center",
            //   verticalAlign: "bottom",
            // },
          },
        },
      ],
    },
  };

  return (
    <S.Wrap>
      <HighchartsReact highcharts={Highcharts} options={option} />
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div``,
};
export default TestGraph;
