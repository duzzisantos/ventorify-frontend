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
import { revenueExtract } from "../utils/helpers";

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
        text: "Top sales",
      },
    },
  };

  //find information on top sales no regardless of category
  const topSalesLabel = [...new Set(chart.map((element) => element.product))];

  const topSoldProducts = topSalesLabel.map((product) => {
    const filteredItems = chart
      .filter((item) => item.product === product)
      .map((p) => p);
    const revenue = filteredItems
      .map((item) => item.salesOperations.revenue)
      .reduce((a, b) => a + b, 0);
    return { product, revenue };
  });

  console.log(topSoldProducts);

  //Determine the revenue contribution of each product
  const salesRankingData = topSoldProducts.map((x) => x.revenue);

  console.log(salesRankingData);
  const data = {
    topSalesLabel,
    datasets: [
      {
        label: "Total sales per category",
        data: salesRankingData,
        backgroundColor: ["#2f4f4f"],
        borderColor: ["#2f4f4f"],
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
