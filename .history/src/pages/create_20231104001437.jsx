import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { allProducts, product } from "../charts/mockdata";
import { getProductEOQ } from "../utils/getProductEOQ";
import {
  Tags,
  Diagram3Fill,
  ListOl,
  PersonCircle,
  Boxes,
  Calendar3,
  SendFill,
  CurrencyEuro,
} from "react-bootstrap-icons";

import axios from "axios";
import { Alert } from "react-bootstrap";

const CreateRecord = () => {
  const [record, setRecord] = useState({
    officerName: "",
    category: "",
    product: "",
    batchNumber: 0,
    batchAmount: 0,
    price: 0,
    economicOQ: 0,
    productImage: "",
    entryDate: "",
  });

  const [productPrices, setProductPrices] = useState([]);

  const renderProductOptions = allProducts
    .map((item, i) => item)
    .map((data, index) => <option key={index}>{data}</option>);

  // this is the area we apply useState in the select options
  const renderProductCategories = product.map((item) => (
    <option key={item.id}>{item.category.toUpperCase()}</option>
  ));

  const handlePost = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/warehouse", record)
      .then((res) => {
        console.log(res.status);
        setTimeout(() => {
          handleTriggerWarehouseBackup();
        }, [2000]);
      })
      .catch((err) => console.error(err.message));
  };

  //original warehouse data before they are aggregated is backed up in a new collection - to
  //encourage ease in reference
  const handleTriggerWarehouseBackup = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/backup");
      console.log(res.statusText);
    } catch (err) {
      console.error("Error in original warehouse backup", err);
    }
  };

  const getProductPrice = () => {
    axios
      .get("http://localhost:4000/api/price-list")
      .then((res) => {
        setProductPrices(res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getProductPrice();
  }, []);

  //function to render Economic order quantity dynamically when select value changes
  //This helps provide some control over EOQ input - to encourage consistent numbers per entry

  const renderEOQ = () => {
    for (const item of allProducts) {
      if (item.includes(record.product)) {
        return getProductEOQ(item);
      }
    }
  };

  const renderProductPrice = () => {
    for (const item of productPrices) {
      if (item.product.includes(record.product)) {
        return item.unitPrice;
      }
    }
  };

  useEffect(() => {
    renderEOQ();
  });

  const filteredOutRecords =
    record.product !== "---TOILETERIES---" ||
    record.product !== "---DAIRY---" ||
    record.product !== "---DRINKS---" ||
    record.product !== "---DRY---" ||
    record.product !== "---MEAT---"
      ? record.product
      : !record.product;

  //Format image url string to Base64

  return (
    <>
      <Container className="col-md-10 text-secondary">
        <div className="my-5 text-start mx-3">
          <h1 className="fw-bold">Create records</h1>
          <p>Enter new inventory information to the warehouse.</p>
        </div>
        <hr />
        <div className="mx-3 mb-5 col-md-6 text-start">
          <form>
            <div className="mb-3">
              <label htmlFor="officerName" className="form-label">
                <PersonCircle /> Officer name
              </label>
              <input
                type="text"
                className="form-control"
                id="officerName"
                aria-describedby="emailHelp"
                value={record.officerName}
                onChange={(e) =>
                  setRecord({ ...record, officerName: e.target.value })
                }
              />
            </div>
            <hr />
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                <Diagram3Fill /> Category
              </label>
              <select
                id="category"
                className="form-select"
                value={record.category}
                onChange={(e) =>
                  setRecord({ ...record, category: e.target.value })
                }
              >
                {renderProductCategories}
              </select>
            </div>
            <hr />
            <div className="mb-3">
              <label htmlFor="product" className="form-label">
                <Tags /> Product
              </label>
              <select
                id="product"
                className="form-select"
                value={record.product}
                onChange={(e) =>
                  setRecord({ ...record, product: e.target.value })
                }
              >
                {renderProductOptions}
              </select>
            </div>
            <hr />
            <div className="mb-3">
              <label htmlFor="batchNumber" className="form-label">
                <ListOl /> Batch number
              </label>
              <input
                type="number"
                className="form-control"
                id="batchNumber"
                value={record.batchNumber}
                onChange={(e) =>
                  setRecord({ ...record, batchNumber: e.target.value })
                }
              />
            </div>
            <hr />
            <div className="mb-3">
              <label htmlFor="batchAmount" className="form-label">
                <Boxes /> Batch amount (Units)
              </label>
              <input
                type="number"
                className="form-control"
                id="batchAmount"
                value={record.batchAmount}
                onChange={(e) =>
                  setRecord({ ...record, batchAmount: e.target.value })
                }
              />
            </div>
            <hr />
            <div className="mb-3">
              <label htmlFor="batchAmount" className="form-label">
                <CurrencyEuro /> Price (Euro)
              </label>
              <input
                type="number"
                className="form-control"
                id="batchAmount"
                value={record.price}
                onChange={(e) =>
                  setRecord({ ...record, price: e.target.value })
                }
              />

              {filteredOutRecords && (
                <Alert variant="success" className="mt-3 text-start">
                  Note: Predefined price for {filteredOutRecords} is $
                  {renderProductPrice()}
                </Alert>
              )}
            </div>
            <hr />
            <div className="mb-3">
              <label htmlFor="economicOQ" className="form-label">
                <Boxes /> EOQ (Units)
              </label>
              <input
                type="number"
                className="form-control"
                value={record.economicOQ}
                name="economicOQ"
                id="economicOQ"
                onChange={(e) =>
                  setRecord({ ...record, economicOQ: e.target.value })
                }
              />

              {filteredOutRecords && (
                <Alert
                  variant="success"
                  className="text-dark mt-3 text-start px-2 rounded-2"
                >
                  Note: Predefined EOQ value for {filteredOutRecords} is{" "}
                  {renderEOQ()}
                </Alert>
              )}
            </div>
            <hr />

            <div className="mb-3">
              <label htmlFor="entryDate" className="form-label">
                <Calendar3 /> Entry date
              </label>
              <input
                type="date"
                className="form-control"
                id="entryDate"
                value={record.entryDate}
                onChange={(e) =>
                  setRecord({ ...record, entryDate: e.target.value })
                }
              />
            </div>
            <hr />
            <button
              type="submit"
              className="btn btn-success"
              onClick={handlePost}
            >
              Submit <SendFill />
            </button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default CreateRecord;
