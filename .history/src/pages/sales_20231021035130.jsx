import React, { useState, useMemo } from "react";
import axios from "axios";
import Container from "react-bootstrap/esm/Container";
import SalesTrend from "../charts/sales-trend";
import SalesPerCategory from "../charts/sales-per-category";
import TopSales from "../charts/top-sales";

const Sales = () => {
  const [sales, setSales] = useState([]);
  useMemo(() => {
    axios
      .get("http://localhost:4000/api/sales")
      .then((result) => {
        setSales(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <Container className="col-md-10 major-wrapper">
      <div className="my-5 text-start mx-3 text-secondary">
        <h1 className="fw-bold">Sales</h1>
        <p>View sales performance over time.</p>
      </div>
      <div className="my-4 mx-3 d-flex flex-row flex-wrap hstack gap-3">
        <div className="col-4 p-3 table-border shadow-sm">
          <SalesTrend chart={sales} />
        </div>
        <div className="col-4  p-3 table-border shadow-sm">
          <SalesPerCategory chart={sales} />
        </div>
        <div className="col-4 p-3 table-border shadow-sm">
          <TopSales chart={sales} />
        </div>
      </div>
    </Container>
  );
};

export default Sales;
