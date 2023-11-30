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

  const topSoldUnits = topSalesLabel.map((element) => {
    const filteredItems = chart
      .filter((item) => item.category === element)
      .map((p) => p.price);
    const soldItems = filteredItems
      .map((item) => item.salesOperations.quantity)
      .reduce((a, b) => a + b, 0);
    return { element, soldItems };
  });

  console.log(topSoldUnits);

  //Extract total price for each product
  const topSalesData = topSalesLabel.map((element) => {
    const filteredItems = chart
      .filter((item) => item.category === element)
      .map((p) => p.price);
    const totalPrice = filteredItems.reduce((a, b) => a + b, 0);
    return { element, totalPrice };
  });

  console.log(topSalesData);
  //Determine the revenue contribution of each product
  const salesRankingData = topSalesData
    .map((element, i) =>
      revenueExtract(element.batchAmount, topSoldUnits[i], element.soldPrice)
    )
    .slice(0, 10);

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
