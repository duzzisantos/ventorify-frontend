import React, { useState, useMemo } from "react";
import axios from "axios";
import { http } from "../api-calls/http";
import Container from "react-bootstrap/esm/Container";
import SalesTrend from "../charts/SalesTrend";
import SalesPerCategory from "../charts/SalesPerCategory";
import TopSales from "../charts/TopSales";

const Sales = ({ accessToken }) => {
  const [sales, setSales] = useState([]);

  const { isLocal, isProduction, localhost, webhost } = http;
  useMemo(() => {
    axios
      .get(
        isLocal
          ? `${localhost}/api/sales`
          : isProduction && `${webhost}/api/sales`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      .then((result) => {
        setSales(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [accessToken, isLocal, isProduction, webhost, localhost]);

  return (
    <Container className="col-md-10 mb-5 pb-5">
      <div className="my-5 mb-0 text-start mx-3 text-secondary">
        <h1 className="fw-bold">Sales</h1>
        <p>View sales performance over time.</p>
      </div>
      <hr />
      <div className="row row-cols-1 row-cols-md-2 my-4 mx-3 g-2">
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
