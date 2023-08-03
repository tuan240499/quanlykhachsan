import Chart from "react-apexcharts";
import { formatNumber } from "../../../utils/number";

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
const IncomeExpenseChart = ({ income, expense }) => {
  const series = [
    {
      name: "Tổng thu",
      type: "area",
      data: income,
    },
    {
      name: "Tổng chi",
      type: "area",
      data: expense,
    },
  ];
  const options = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
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
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "top",
      fontSize: "14px",
      fontWeight: 500,
      horizontalAlign: "right",
      itemMargin: {
        horizontal: 10,
        vertical: 15,
      },
    },
    stroke: {
      curve: "smooth",
    },
    grid: {
      show: true,
      borderColor: "#B9B9B9",
      strokeDashArray: 3,
      row: {
        color: undefined,
        opacity: 0,
      },
    },
    xaxis: {
      categories: MONTH,
    },
    yaxis: {
      labels: {
        formatter: (value) => {
          return value >= 0 ? formatNumber(value) : "";
        },
      },
    },
    tooltip: {
      x: {
        show: false,
      },
    },
  };
  return <Chart series={series} height="400" options={options} />;
};

export default IncomeExpenseChart;
