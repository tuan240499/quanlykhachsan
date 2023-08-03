import Chart from "react-apexcharts";
import { formatNumber } from "../utils/number";

const MONTH = [
  "T1",
  "T2",
  "T3",
  "T4",
  "T5",
  "T6",
  "T7",
  "T8",
  "T9",
  "T10",
  "T11",
  "T12",
];
const SparkLineChart = ({ data }) => {
  const series = [
    {
      type: "area",
      data: data,
    },
  ];
  const options = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: { show: false },
      sparkline: {
        enabled: true,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0,
        opacityFrom: 0.4,
        opacityTo: 0.4,
      },
    },
    // dataLabels: {
    //   enabled: false,
    // },
    // legend: {
    //   show: false,
    // },
    stroke: {
      curve: "smooth",
    },
    // grid: {
    //   show: false,
    // },
    // xaxis: {
    //   show: false,
    // },
    yaxis: {
      show: false,
      labels: {
        formatter: (value) => {
          return value >= 0 ? formatNumber(value) : "";
        },
      },
    },
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function (seriesName) {
            return "";
          },
        },
      },
      marker: {
        show: false,
      },
    },
  };
  return <Chart series={series} height="200" width="100%" options={options} />;
};

export default SparkLineChart;
