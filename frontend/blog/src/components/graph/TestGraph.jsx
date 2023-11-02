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

const TestGraph = forwardRef(({ data, threshold, type, num }) => {
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
    console.log(result);
    const newData = {
      name: transName[t],
      yAxis: 0,
      data: data.map((item, idx) => {
        return {
          x: item["time"],
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
      events: {
        afterAnimate: function () {
          console.log(this);
          // 특정 zone에서만 심볼 활성화
          if (this.data[2].y >= 10.5) {
            console.log(this);
            this.update({ marker: { enabled: true } }, false);
          }
        },
      },
    };
    datas.push(newData);
  }

  const option = {
    chart: {
      height: "100%",
      events: {
        load: function () {
          // set up the updating of the chart each second
          // var series = this.series[0];
          // var interval = setInterval(function () {
          //   if (!Object.keys(series).includes("data")) {
          //     clearInterval(interval);
          //   } else {
          //     var x = x_++, // current time
          //       y = Math.round(Math.random() * 4);
          //     series.addPoint([x, y], true, true);
          //   }
          // }, 1000);
        },
      },
    },
    accessibility: {
      enabled: false,
    },

    time: {
      useUTC: false,
    },
    rangeSelector: {
      buttons: [],
      inputEnabled: false,
      selected: 0,
    },
    exporting: {
      enabled: false,
    },
    title: {
      text: `Test ${num} data`,
      align: "center",
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
      accessibility: {
        rangeDescription: "Range: 2010 to 2020",
      },
      // categories: x,
    },

    legend: {
      floating: true, // 레전드를 그래프 위에 표시
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
            maxWidth: 500,
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
});

const S = {
  Wrap: styled.div``,
};
export default TestGraph;
