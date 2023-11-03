import React, { useImperativeHandle, forwardRef, useRef } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import styled from "styled-components";

const transName = {
  voltageMeasured: "전압(Volts)",
  currentMeasured: "전류(Amps)",
  temperatureMeasured: "온도(°C)",
};

const TestGraph = forwardRef(({ data, threshold, type, num }, ref) => {
  const datas = [];
  const chartRef = useRef(null); // 차트 참조를 저장할 ref

  const addData = (x, y, i) => {
    if (!chartRef) return;
    const series = chartRef.current.chart.series[i];
    series.addPoint([x, y], true, true);
  };

  // 자식 함수를 외부에서 호출할 수 있도록 설정
  useImperativeHandle(ref, () => ({
    addData,
  }));

  for (const t of type) {
    const newData = {
      name: transName[t],
      data: data.map((item) => {
        return [item["time"], item[t]];
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

    yAxis: {
      title: {
        // text: "Capacity",
      },
    },

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
    },

    series: datas,

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
      <HighchartsReact
        ref={chartRef}
        highcharts={Highcharts}
        options={option}
        constructorType={"stockChart"}
      />
    </S.Wrap>
  );
});

const S = {
  Wrap: styled.div``,
};
export default TestGraph;
