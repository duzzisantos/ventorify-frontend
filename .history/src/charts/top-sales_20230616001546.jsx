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
const TopSales = ({ chart }) => {
  const options = {
    reponsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Top sales per product",
      },
    },
  };

  //find information on top sales no regardless of category
  const topSalesLabel = [...new Set(chart.map((element) => element.product))];

  //use unique product names to filter out and evaluate total revenue per product => return as object with unique products and revenue
  const topSoldProducts = topSalesLabel
    .map((product) => {
      const filteredItems = chart
        .filter((item) => item.product === product)
        .map((p) => p);
      const totalRevenue = filteredItems
        .map((item) => item.salesOperations.revenue)
        .reduce((a, b) => a + b, 0);
      return { product, totalRevenue };
    })
    .map((product) => product.totalRevenue);

  const data = {
    labels: topSalesLabel,
    datasets: [
      {
        label: "Total sales per product ($)",
        data: topSoldProducts,
        backgroundColor: ["#2f4f4f"],
        borderColor: ["whitesmoke"],
      },
    ],
  };

  return (
    <>
      <Bar data={data} options={options} />
    </>
  );
};

export default TopSales;
