import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const SalesPerCategory = ({ chart }) => {
  const options = {
    reponsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total sales per category",
      },
    },
  };

  const labels = [...new Set(chart.map((item) => item.category))];
  const filteredData1 = labels.map((category) => {
    const filteredRevenue = chart
      .filter((item) => item.category === category)
      .map((item) => item.salesOperations.revenue);
    const totalRevenue = filteredRevenue.reduce((a, b) => a + b, 0);
    return totalRevenue;
  });

  const chartData = filteredData1.map((el) => el.totalRevenue);

  const data = {
    labels,
    datasets: [
      {
        label: "Total sales per category",
        data: chartData,
        backgroundColor: ["#013f28"],
        borderColor: ["#013f28"],
      },
    ],
  };

  return (
    <>
      <Bar data={data} options={options} />
    </>
  );
};

export default SalesPerCategory;
