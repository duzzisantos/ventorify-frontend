import React, { useState, useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";
import axios from "axios";
import { HouseFill, CartFill, BarChartFill } from "react-bootstrap-icons";
import {
  customDateFormat,
  customTimeFormat,
  preferredLanguage,
} from "../utils/helpers";
import EmptyContent from "../components/empty-content";
const OperationLogs = () => {
  const [activity, setActivity] = useState([]);
  const [warehouse, setWarehouse] = useState([]);
  const [purchases, setPurchases] = useState([]);

  //get sales data to generate operations report with
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/sales");
        const data = res.data;
        setActivity(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  //REMEMBER TO BACKUP WAREHOUSE BEFORE TRANSFERRING TO SHELF
  //get warehouse data to generate operations report with
  useEffect(() => {
    const getWarehouse = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/backup/display-backup"
        );
        const data = res.data;
        setWarehouse(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getWarehouse();
  }, []);

  //get purchase report data to generate operations report with
  useEffect(() => {
    const getPurchases = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/reorder");
        const data = res.data;
        setPurchases(data);
      } catch (err) {
        console.error(err.message);
      }
    };
    getPurchases();
  }, []);

  const handleClearSalesTable = () => {
    axios
      .delete("http://localhost:4000/api/sales")
      .then((res) => console.log(res.status))
      .catch((err) => console.error(err.message));
  };

  return (
    <Container className="col-md-10 pb-5 text-secondary">
      <div className="my-5 text-start mx-3">
        <h1 className="fw-bold">Operations</h1>
        <p>Track operation logs for at least a month period.</p>
      </div>
      <hr />
      <section className="vstack gap-3 d-flex flex-column">
        <div className="mx-3 text-start d-flex flex-column">
          <p className="my-p fw-bold">
            <HouseFill /> Warehouse logs
          </p>
          <div className="overflow-y-auto" style={{ height: "fit-content" }}>
            <Table className="text-secondary table-border" hover responsive>
              <thead className="text-white bg-secondary">
                <tr>
                  {/* <th>S.No</th> */}
                  <th>Category</th>
                  <th>Product</th>
                  <th>Responsible staff</th>
                  <th>Amount stowed</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto">
                {warehouse.map((task) =>
                  !task ? (
                    <EmptyContent />
                  ) : (
                    <tr key={task._id}>
                      <td>{task.category}</td>
                      <td>{task.product}</td>
                      <td>{task.officerName}</td>
                      <td>{task.batchAmount}</td>
                      <td>
                        {customDateFormat(
                          task.firstEntryDate,
                          preferredLanguage,
                          "UTC"
                        )}{" "}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </div>
          <Button variant="danger">Delete Warehouse Data</Button>
        </div>
        <hr />

        <div className="mx-3 mb-3 text-start d-flex flex-column">
          <p className="my-p fw-bold">
            <BarChartFill /> Sales logs
          </p>
          <div className="overflow-y-auto" style={{ height: "fit-content" }}>
            <Button
              variant="danger"
              className="my-2 ms-auto hstack"
              onClick={handleClearSalesTable}
            >
              Clear sales table
            </Button>
            <Table className="text-secondary table-border" hover responsive>
              <thead className="bg-secondary text-light">
                <tr>
                  <th>Category</th>
                  <th>Product</th>
                  <th>Revenue</th>
                  <th>Date - Time</th>
                </tr>
              </thead>
              <tbody>
                {activity.map((sale) =>
                  !sale ? (
                    <EmptyContent />
                  ) : (
                    <tr key={sale._id}>
                      <td>{sale.category}</td>
                      <td>{sale.product}</td>
                      <td>${sale.salesOperations.revenue.toPrecision(4)}</td>
                      <td>
                        {customDateFormat(
                          sale.updatedAt,
                          preferredLanguage,
                          "UTC"
                        )}{" "}
                        -{" "}
                        {customTimeFormat(
                          sale.updatedAt,
                          preferredLanguage,
                          "UTC"
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </div>
        </div>

        <hr />
        <div className="mx-3 text-start mb-3 d-flex flex-column">
          <p className="my-p fw-bold">
            <CartFill /> Purchase logs
          </p>
          <div className="overflow-auto" style={{ height: "fit-content" }}>
            <Table className="text-secondary table-border" hover responsive>
              <thead className="bg-secondary text-white">
                <tr>
                  <th>Category</th>
                  <th>Product</th>
                  <th>EOQ</th>
                  <th>Price</th>
                  <th>Reorder Quantity</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((element) => (
                  <tr key={element._id}>
                    <td>{element.category}</td>
                    <td>{element.product}</td>
                    <td>{element.economicOrderQuantity}</td>
                    <td>{element.price}</td>
                    <td>{element.totalProductCount}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default OperationLogs;
