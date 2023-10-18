import * as React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const TestGraph = ({ data, type, num }) => {
  const datas = [];
  for (const t of type) {
    const newData = {
      name: t,
      data: data.map((item) => {
        return [item["time"], item[t]];
      }),
    };
    datas.push(newData);
  }

  const option = {
    title: {
      text: `Test ${num} data`,
      align: "left",
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
      accessibility: {
        rangeDescription: "Range: 2010 to 2020",
      },
      // categories: x,
    },

    legend: {
      floating: true, // 레전드를 그래프 위에 표시
      layout: "vertical",
      align: "right",
      verticalAlign: "top",
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
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
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
export default TestGraph;
