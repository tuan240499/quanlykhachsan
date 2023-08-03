import Chart from "react-apexcharts";

const RoomChart = ({ data }) => {
  const series = data;
  const options = {
    chart: {
      type: "pie",
      toolbar: { show: false },
    },
    labels: ["Trống", "Đang giữ", "Đã thuê"],
    legend: {
      position: "bottom",
      fontSize: "14px",
    },
  };
  return (
    <Chart
      series={series}
      width="100%"
      height="300"
      type="pie"
      options={options}
    />
  );
};

export default RoomChart;
