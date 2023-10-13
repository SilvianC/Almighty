import * as React from "react";
import { ResponsiveLine } from "@nivo/line";

const MetaGraph = ({ data, type }) => {
  const newData =
    type === "Capacity"
      ? [
          {
            id: "Capacity",
            color: "hsl(68, 70%, 50%)",
            data: [],
          },
        ]
      : [
          {
            id: "Re",
            data: [],
          },
          {
            id: "Rct",
            data: [],
          },
        ];
  if (type === "Capacity") {
    const filter = data.filter(
      (item) => Object.keys(item).includes("Capacity") && item["Capacity"]
    );
    newData[0]["data"] = filter.map((item) => {
      return {
        x: item["test_id"],
        y: item["Capacity"],
      };
    });
  } else {
    const filter = data.filter(
      (item) => Object.keys(item).includes("Re") && item["Re"]
    );
    newData[0]["data"] = filter.map((item) => {
      return {
        x: item["test_id"],
        y: item["Re"],
      };
    });
    newData[1]["data"] = filter.map((item) => {
      return {
        x: item["test_id"],
        y: item["Rct"],
      };
    });
  }
  console.log(newData);
  return (
    <div style={{ width: "800px", height: "500px", margin: "0 auto" }}>
      <ResponsiveLine
        data={newData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        xFormat=" >-d"
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="linear"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Test",
          legendOffset: 36,
          legendPosition: "middle",
          renderTick: (tick) => {
            return (
              <g transform={`translate(${tick.x},${tick.y})`}>
                <text
                  x={0}
                  y={0}
                  dy={16}
                  textAnchor="middle"
                  // fill="#000"
                  fontSize={10} // x축 레이블의 글꼴 크기
                >
                  {tick.tickIndex === 0 ||
                  tick.tickIndex === newData[0]["data"].length - 1 ? (
                    tick.value
                  ) : (
                    <></>
                  )}
                </text>
              </g>
            );
          },
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: -40,
          legendPosition: "middle",
        }}
        enablePoints={false}
        enableGridX={false}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 50,
            translateY: 50,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};
export default MetaGraph;
