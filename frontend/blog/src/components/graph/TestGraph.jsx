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
  console.log(threshold);
  for (const t of type) {
    const arr = data.map((item) => item[t]);
    // const result = arr.reduce(
    //   (acc, current, index, array) => {
    //     if (current >= 10.5 && (index === 0 || array[index - 1] < 10.5)) {
    //       acc.start.push(index);
    //     } else if (current <= 10.5 && index > 0 && array[index - 1] > 10.5) {
    //       acc.end.push(index - 1);
    //     }
    //     return acc;
    //   },
    //   { start: [], end: [] }
    // );
    const newData = {
      name: transName[t],
      yAxis: 0,
      turboThreshold: 10000,
      data: data.map((item, idx) => {
        return {
          x: item["time"] * 3600,
          y: item[t],
          // marker: {
          //   enabled: result.start.includes(idx) || result.end.includes(idx),
          // },
        };
      }),
      color:
        t === "temperatureMeasured"
          ? "teal"
          : t === "voltageMeasured"
          ? "darkorange"
          : "purple",
      zones:
        t === "temperatureMeasured"
          ? [
              {
                value: threshold.chargingMinTemperature,
                color: "blue",
              },
              {
                value: threshold.chargingMaxTemperature,
                color: "teal",
              },
              {
                color: "red",
              },
            ]
          : t === "voltageMeasured"
          ? [
              {
                value: threshold.underVoltage,
                color: "blue",
              },
              {
                value: threshold.overVoltage,
                color: "darkorange",
              },
              {
                color: "red",
              },
            ]
          : [
              {
                value: threshold.overCurrent,
                color: "purple",
              },
              {
                color: "red",
              },
            ],
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
    chart: {
      type: "line",
      panning: true, // 드래그로 이동을 활성화
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

    yAxis: [
      {
        // visible: false,
        title: {
          text: null,
        },
        labels: {
          enabled: false,
        },
        plotLines: [
          {
            value: threshold.overVoltage, // 수평선을 그릴 y-값 (원하는 기준값)
            color: "red", // 수평선의 색상
            width: 0.3, // 수평선의 두께
            zIndex: 1, // 수평선의 쌓임 순서 (선택 사항)
            label: {
              align: "right", // 레이블의 위치 (선택 사항)
              x: -10, // 레이블의 x-오프셋 (선택 사항)
            },
          },
          {
            value: threshold.underVoltage, // 수평선을 그릴 y-값 (원하는 기준값)
            color: "blue", // 수평선의 색상
            width: 0.3, // 수평선의 두께
            zIndex: 1, // 수평선의 쌓임 순서 (선택 사항)
            label: {
              align: "right", // 레이블의 위치 (선택 사항)
              x: -10, // 레이블의 x-오프셋 (선택 사항)
            },
          },
          {
            value: threshold.overCurrent, // 수평선을 그릴 y-값 (원하는 기준값)
            color: "red", // 수평선의 색상
            width: 0.1, // 수평선의 두께
            zIndex: 1, // 수평선의 쌓임 순서 (선택 사항)
            label: {
              align: "right", // 레이블의 위치 (선택 사항)
              x: -10, // 레이블의 x-오프셋 (선택 사항)
            },
          },
          {
            value: threshold.chargingMaxTemperature, // 수평선을 그릴 y-값 (원하는 기준값)
            color: "red", // 수평선의 색상
            width: 0.1, // 수평선의 두께
            zIndex: 1, // 수평선의 쌓임 순서 (선택 사항)
            label: {
              align: "right", // 레이블의 위치 (선택 사항)
              x: -10, // 레이블의 x-오프셋 (선택 사항)
            },
          },
          {
            value: threshold.chargingMinTemperature, // 수평선을 그릴 y-값 (원하는 기준값)
            color: "blue", // 수평선의 색상
            width: 0.1, // 수평선의 두께
            zIndex: 1, // 수평선의 쌓임 순서 (선택 사항)
            label: {
              align: "right", // 레이블의 위치 (선택 사항)
              x: -10, // 레이블의 x-오프셋 (선택 사항)
            },
          },
        ],
      },
      {
        visible: false,
        title: {
          // text: "잔량(%)",
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
        data: data.map((item) => {
          return [
            item["time"] * 3600,
            item["soc"] > 100 ? 100 : item["soc"] < 0 ? 0 : item["soc"],
          ];
        }),
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
      <img
        class="VIT-INFO"
        src="/Vector.png"
        alt="Grapefruit slice atop a pile of other slices"
      />

      <S.Info>잘했다.</S.Info>

      <p>VIT</p>

      <div>
        <HighchartsReact highcharts={Highcharts} options={option} />
      </div>
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div`
    flex: 1;
    padding: 10px;
    > div {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    .VIT-INFO {
      position: relative;
      left: 55px;
      top: 15px;
    }

    > p {
      color: #034f9e;
      margin-bottom: 0px;
      margin-left: 20px;
      font-weight: bold;
      font-size: 20px;
    }
  `,
  Info: styled.div`
    position: relative;
    left: 55px;
    top: 15px;
    width: 100px;
    height: 100px;
  `,
};
export default TestGraph;
