import axios from "axios";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

import PriceEditModal from "./PriceEditModal";
import PriceTableBody from "./PriceTablebody";

const PriceTable = () => {
  const [price, setPrice] = useState([]);
  const [show, setShow] = useState(false);
  const [grabId, setGrabId] = useState("");
  const [product, setProductEdit] = useState("");
  const [category, setCategoryEdit] = useState("");
  const [unitPrice, setUnitPriceEdit] = useState(0);
  const getPrices = () => {
    axios
      .get("http://localhost:4000/api/price-list")
      .then((res) => {
        setPrice(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getPrices();
  }, []);

  const handleDelete = (_id) => {
    axios
      .delete(`http://localhost:4000/api/price-list/${_id}`)
      .then((res) => {
        console.log(res.statusText);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleShowModal = (_id) => {
    setShow(true);
    setGrabId(_id);
  };

  return (
    <section className="mx-3 pb-5" style={{ height: "fit-content" }}>
      <h3 className="fw-bold text-start">Price table</h3>
      <table className="w-100">
        <thead className="bg-secondary text-light">
          <tr className="text-start text-secondary">
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Product Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {price.map((element) => (
            <PriceTableBody
              index={element._id}
              element={element}
              handleDelete={handleDelete}
              handleShowModal={handleShowModal}
            />
          ))}
        </tbody>
      </table>
      {show && (
        <PriceEditModal
          show={show}
          setShow={setShow}
          _id={grabId}
          product={product}
          setProductEdit={setProductEdit}
          unitPrice={unitPrice}
          setUnitPriceEdit={setUnitPriceEdit}
          category={category}
          setCategoryEdit={setCategoryEdit}
        />
      )}
    </section>
  );
};

export default PriceTable;
