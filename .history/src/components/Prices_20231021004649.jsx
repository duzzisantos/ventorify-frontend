import React, { useState } from "react";
import { allProducts, product } from "../charts/mockdata";

import {
  Tags,
  Diagram3Fill,
  SendFill,
  CurrencyEuro,
} from "react-bootstrap-icons";

import axios from "axios";

const Prices = () => {
  const [record, setRecord] = useState({
    category: "",
    product: "",
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
    axios
      .post("http://localhost:4000/api/price-list", record)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <section>
      <h3>Add new prices</h3>
      <div className="mx-3 mb-5 col-md-6 text-start border vorder-secondary p-3">
        <form onSubmit={handlePost} encType="multipart/form-data">
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
            <label htmlFor="batchAmount" className="form-label">
              <CurrencyEuro /> Price (Euro)
            </label>
            <input
              type="number"
              className="form-control"
              id="batchAmount"
              value={record.price}
              onChange={(e) => setRecord({ ...record, price: e.target.value })}
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
