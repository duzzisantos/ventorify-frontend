import React, { useState, useEffect } from "react";
import axios from "axios";
import SalesPerCategory from "./sales-per-category";
import SalesTrend from "./sales-trend";

const SalesDashBoard = () => {
  const [sales, setSales] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/warehouse")
      .then((result) => {
        setSales(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return <></>;
};
