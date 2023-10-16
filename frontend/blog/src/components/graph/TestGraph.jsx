import * as React from "react";
import { ResponsiveLine } from "@nivo/line";

const TestGraph = ({ data, type }) => {
  const newData = {
    id: type,
    color: "hsl(68, 70%, 50%)",
    data: [],
  };
  newData["data"] = data.map((item) => {
    return {
      x: item["time"],
      y: item[type],
    };
  });
  return (
    <div style={{ width: "800px", height: "500px", margin: "0 auto", border:"2px solid", borderRadius:"50px", borderColor:"#eee6c4", padding: "10px", marginBottom: "100px"}}>
      <h3>Test Data Chart</h3>
      <ResponsiveLine
        data={[newData]}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        xFormat=" >-.2f"
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Time",
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
                  tick.tickIndex === data.length - 1 ? (
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
          legend: type,
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
export default TestGraph;
