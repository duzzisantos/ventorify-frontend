import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { http } from "../api-calls/http";
import {
  customDateFormat,
  customTimeFormat,
  preferredLanguage,
} from "../utils/helpers";
import EmptyContent from "../components/EmptyContent";
import WarehouseLogs from "../components/tables/WarehouseLogs";
import SalesLogs from "../components/tables/SalesLogs";
import PurchasesLogs from "../components/tables/PurchasesLogs";
const OperationLogs = ({ accessToken }) => {
  const [activity, setActivity] = useState([]);
  const [warehouse, setWarehouse] = useState([]);
  const [purchases, setPurchases] = useState([]);

  const { isLocal, isProduction, webhost, localhost } = http;
  //get sales data to generate operations report with
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          isLocal
            ? `${localhost}/api/sales`
            : isProduction && `${webhost}/api/sales`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        const data = res.data;
        setActivity(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [accessToken, isLocal, isProduction, localhost, webhost]);

  //REMEMBER TO BACKUP WAREHOUSE BEFORE TRANSFERRING TO SHELF
  //get warehouse data to generate operations report with

  const getWarehouse = async () => {
    try {
      const res = await axios.get(
        isLocal
          ? `${localhost}/api/display-backup`
          : isProduction && `${webhost}/api/display-backup`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const data = res.data;
      setWarehouse(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getWarehouse();
  });

  //get purchase report data to generate operations report with
  useEffect(() => {
    const getPurchases = async () => {
      try {
        const res = await axios.get(
          isLocal
            ? `${localhost}/api/reorder`
            : isProduction && `${webhost}/api/reorder`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        const data = res.data;
        setPurchases(data);
      } catch (err) {
        console.error(err.message);
      }
    };
    getPurchases();
  }, [isLocal, isProduction, localhost, webhost, accessToken]);

  const handleClearSalesTable = () => {
    axios
      .delete(
        isLocal
          ? `${localhost}/api/sales`
          : isProduction && `${webhost}/api/sales`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      .then((res) => console.log(res.status))
      .catch((err) => console.error(err.message));
  };

  const handleDeleteLogs = () => {
    axios
      .delete(
        isLocal
          ? `${localhost}/api/backup/delete`
          : isProduction && `${webhost}/api/backup/delete`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      .then((res) => console.log(res.status))
      .catch((err) => console.error(err.message));
  };

  return (
    <Container className="col-md-10 pb-5 text-secondary">
      <div className="my-5 mb-0 text-start mx-3">
        <h1 className="fw-bold">Operations</h1>
        <p>Track operation logs for at least a month period.</p>
      </div>
      <hr />
      <section className="vstack gap-3 d-flex flex-column">
        <WarehouseLogs
          warehouse={warehouse}
          preferredLanguage={preferredLanguage}
          customDateFormat={customDateFormat}
          handleDeleteLogs={handleDeleteLogs}
        />
        <hr />
        <SalesLogs
          activity={activity}
          preferredLanguage={preferredLanguage}
          customDateFormat={customDateFormat}
          customTimeFormat={customTimeFormat}
          EmptyContent={<EmptyContent />}
          handleClearSalesTable={handleClearSalesTable}
        />
        <hr />
        <PurchasesLogs purchases={purchases} EmptyContent={<EmptyContent />} />
      </section>
    </Container>
  );
};

export default OperationLogs;
