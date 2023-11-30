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
        extractMonth(item.firstEntryDate, preferredLanguage, "UTC")
      )
    ),
  ];

  console.log(labels);

  const chartData = [12000];
  const data = {
    labels,
    datasets: [
      {
        label: "Total sales",
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
