import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const MetaGraph2 = ({ data, type }) => {
  const filter = data.filter(
    (item) => Object.keys(item).includes("capacity") && item["capacity"]
  );
  const y = filter.map((item) => {
    return item["capacity"];
  });
  const x = filter.map((item) => {
    return item["testId"];
  });

  const option = {
    title: {
      text: "U.S Solar Employment Growth",
      align: "left",
    },

    subtitle: {
      text: 'By Job Category. Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>.',
      align: "left",
    },

    yAxis: {
      title: {
        text: "Capacity",
      },
    },

    xAxis: {
      accessibility: {
        rangeDescription: "Range: 2010 to 2020",
      },
      categories: x,
    },

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },

    plotOptions: {
      series: [
        {
          label: {
            connectorAllowed: false,
          },
        },
        {
          type: "line",
          name: "Regression Line",
          data: [
            [0, 1.11],
            [180, 4.51],
          ],
          marker: {
            enabled: false,
          },
          states: {
            hover: {
              lineWidth: 0,
            },
          },
          enableMouseTracking: false,
        },
      ],
    },

    series: [
      {
        name: "Capacity",
        data: y,
      },
    ],

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
export default MetaGraph2;
