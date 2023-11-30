import React from "react";
import { extractMonth, preferredLanguage } from "../utils/helpers";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesTrend = ({ chart }) => {
  //First chart
  const options = {
    reponsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sales Trend",
      },
    },
  };

  const labels = [
    ...new Set(
      chart.map((item) =>
        extractMonth(item.createdAt, preferredLanguage, "UTC")
      )
    ),
  ];

  console.log(labels);

  const chartData = labels.map((month) => {
    const filteredRevenue = chart
      .filter((item) => item.createdAt === month)
      .map((x) => x);

    const totalMonthlyRevenue = filteredRevenue.map(
      (item) => item.salesOperations.revenue
    );
    // .reduce((a, b) => a + b, 0);

    return { month, totalMonthlyRevenue };
  });

  console.log(chartData);
  const data = {
    labels,
    datasets: [
      {
        label: "Sales trend",
        data: chartData,
        backgroundColor: "#5cb85c",
        borderColor: "#5cb85c",
      },
    ],
  };

  return (
    <>
      <Line options={options} data={data} />
    </>
  );
};

export default SalesTrend;
