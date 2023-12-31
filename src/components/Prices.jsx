import React, { useState } from "react";
import { allProducts, product } from "../charts/mockdata";
import { http } from "../api-calls/http";
import {
  Tags,
  Diagram3Fill,
  SendFill,
  CurrencyEuro,
} from "react-bootstrap-icons";
import axios from "axios";

const Prices = ({ accessToken }) => {
  const [record, setRecord] = useState({
    product: "",
    category: "",
    unitPrice: 0,
  });

  const renderProductOptions = allProducts
    .map((item, i) => item)
    .map((data, index) => <option key={index}>{data}</option>);

  // this is the area we apply useState in the select options
  const renderProductCategories = product.map((item) => (
    <option key={item.id}>{item.category.toUpperCase()}</option>
  ));

  const handlePost = () => {
    const { isLocal, isProduction, localhost, webhost } = http;
    axios
      .post(
        isLocal
          ? `${localhost}/api/price-list`
          : isProduction && `${webhost}/api/price-list`,
        record,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <section className="mx-3">
      <h3 className="text-start fw-bold">Add new prices</h3>
      <div className="mb-5 col-md-12 col-lg-6 text-start border rounded-2 p-3">
        <form onSubmit={handlePost} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              <Diagram3Fill /> Category
            </label>
            <select
              id="category"
              name="category"
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
              name="product"
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
            <label htmlFor="price" className="form-label">
              <CurrencyEuro /> Price (Euro)
            </label>
            <input
              type="number"
              className="form-control"
              name="price"
              id="price"
              value={record.unitPrice}
              onChange={(e) =>
                setRecord({ ...record, unitPrice: e.target.value })
              }
            />
          </div>

          <button type="submit" className="btn btn-success">
            Submit <SendFill />
          </button>
        </form>
      </div>
    </section>
  );
};

export default Prices;
