import React, { Component } from "react";
import CanvasJSReact from "../canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const Rowbar = (props) => {
  const options = {
    animationEnabled: true,
    theme: "light2",
    title: {
      //   text: "Most Popular Social Networking Sites",
    },
    axisX: {
      //   title: "Social Network",
      reversed: true,
      labelMaxWidth: 100,
    },
    axisY: {
      //   title: "Monthly Active Users",
      includeZero: true,
      labelFormatter: (e) => e.value + "%",
      maximum: 100,
    },
    data: [
      {
        type: "bar",
        //   dataPoints: [{ y: 2, label: "Generated" }],
        dataPoints: [{ y: 100 * parseFloat(props.prob), label: " " }],
      },
    ],
  };
  return (
    <div>
      <CanvasJSChart
        options={options}
        containerProps={{
          width: "100%",
          height: "150px",
        }}
        /* onRef={ref => this.chart = ref} */
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
};

//   addSymbols(e) {
//     var suffixes = ["", "K", "M", "B"];
//     var order = Math.max(
//       Math.floor(Math.log(Math.abs(e.value)) / Math.log(1000)),
//       0
//     );
//     if (order > suffixes.length - 1) order = suffixes.length - 1;
//     var suffix = suffixes[order];
//     return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
//     }

export default Rowbar;
