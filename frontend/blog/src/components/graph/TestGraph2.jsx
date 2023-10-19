import * as React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import styled from "styled-components";

const transName = {
  voltageMeasured: "전압(Volts)",
  currentMeasured: "전류(Amps)",
  temperatureMeasured: "온도(°C)",
};

const TestGraph = ({ data, type, num }) => {
  const datas = [];
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
                value: 9,
                color: "green",
              },
              {
                color: "red",
              },
            ]
          : null,
      color: t === "temperatureMeasured" ? "green" : null,
    };
    datas.push(newData);
  }

  const option = {
    chart: {
      height: "100%",
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
      <HighchartsReact highcharts={Highcharts} options={option} />
    </S.Wrap>
  );
};

const S = {
  Wrap: styled.div``,
};
export default TestGraph;
