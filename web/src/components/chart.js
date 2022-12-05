import React from "react";
import CanvasJSReact from "../canvasjs.react";
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ColumnChart = (props) => {
  const options = {
    title: {
      text: "",
    },
    animationEnabled: true,
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: 1,
      },
    },
    data: [
      {
        // Change type to "doughnut", "line", "splineArea", etc.
        type: "column",
        dataPoints: [
          { label: "Generated", y: parseFloat(props.prob) },
          { label: "Real", y: 1 - parseFloat(props.prob) },
        ],
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

export default ColumnChart;
