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

const TestGraph = ({ data, threshold, type }) => {
  const datas = [];
  let option = {
    chart: {
      type: "spline",
      panning: true, // 드래그로 이동을 활성화
      borderRadius: 25, // 틀을 둥글게 조절하는 값
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
  };
  if (data) {
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

    option = {
      ...option,
      tooltip: {
        // shared: true,
        pointFormat:
          '<span style="color:{series.color}">\u25CF</span> {series.name} <b>{point.y:.2f}</b><br>',
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
          // tooltip: {
          //   pointFormat:
          //     '<span style="color:{series.color}">\u25CF</span> 잔량: <b>{point.y:.2f}%</b>',
          // },
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
  }

  return (
    <S.Wrap>
      <div>
        <img src="LineChart.png" className="line"></img>
        <p>VIT</p>
      </div>

      <HighchartsReact highcharts={Highcharts} options={option} />
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div`
    padding: 10px;
    div {
      display: flex;
      flex-direction: row;
      .line {
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
export default TestGraph;
