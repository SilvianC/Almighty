import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const MetaGraph2 = ({ data, type, clickPoint }) => {
  const filter = data.filter(
    (item) => Object.keys(item).includes("capacity") && item["capacity"]
  );
  const d2 = filter.map((item) => {
    return [item["testId"], item["capacity"]];
  });

  const option = {
    title: {
      text: "Discharge Battery Metadata",
      align: "left",
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
      accessibility: {
        rangeDescription: "Range: 2010 to 2020",
      },
      // categories: x,
    },

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },

    plotOptions: {
      label: {
        connectorAllowed: false,
      },
    },

    series: [
      {
        name: "Capacity",
        data: d2,
        point: {
          events: {
            click: function () {
              clickPoint(this.x);
            },
          },
        },
      },

      {
        type: "line",
        name: "Regression Line",
        data: [d2[0], d2[d2.length - 1]],
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
