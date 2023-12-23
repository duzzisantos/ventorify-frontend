import axios from "axios";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { http } from "../api-calls/http";
import PriceEditModal from "./PriceEditModal";
import PriceTableBody from "./PriceTablebody";
import EmptyContent from "./EmptyContent";

const PriceTable = ({ accessToken }) => {
  const [price, setPrice] = useState([]);
  const [show, setShow] = useState(false);
  const [grabId, setGrabId] = useState("");
  const [product, setProductEdit] = useState("");
  const [category, setCategoryEdit] = useState("");
  const [unitPrice, setUnitPriceEdit] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { isLocal, isProduction, localhost, webhost } = http;
  const getPrices = () => {
    axios
      .get(
        isLocal
          ? `${localhost}/api/price-list`
          : isProduction && `${webhost}/api/price-list`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        setPrice(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getPrices();
    handleDelete();
  });

  const handleDelete = (_id) => {
    axios
      .delete(
        isLocal
          ? `${localhost}/api/price-list/${_id}`
          : isProduction && `${webhost}/api/price-list/${_id}`
      )
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

  const handleUpdatePrice = async (_id) => {
    try {
      const response = await axios.put(
        isLocal
          ? `${localhost}/api/price-list/${_id}`
          : isProduction && `${webhost}/api/price-list/${_id}`,
        {
          product,
          category,
          unitPrice,
        }
      );
      if (!response.status === 200) {
        throw new Error(`${response.status}, ${response.statusText}`);
      } else {
        const data = response.data;
        return data.json();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleEditCategory = (e) => {
    setCategoryEdit(e.target.value);
  };

  const handleEditUnitPrice = (e) => {
    setUnitPriceEdit(e.target.value);
  };

  const handleEditProduct = (e) => {
    setProductEdit(e.target.value);
  };
  return (
    <section className="mx-3 pb-5" style={{ height: "fit-content" }}>
      <h3 className="fw-bold text-start">Price table</h3>
      {isLoading ? (
        "...Price information is loading"
      ) : (
        <Table hover responsive>
          <thead className="bg-secondary text-light">
            <tr className="text-start">
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
                key={element._id}
                element={element}
                handleDelete={handleDelete}
                handleShowModal={handleShowModal}
              />
            ))}
          </tbody>
        </Table>
      )}
      {show && (
        <PriceEditModal
          show={show}
          priceData={price}
          setShow={setShow}
          _id={grabId}
          product={product}
          unitPrice={unitPrice}
          category={category}
          setCategory={setCategoryEdit}
          setProduct={setProductEdit}
          setUnitPrice={setUnitPriceEdit}
          handleClose={handleClose}
          handleEditCategory={handleEditCategory}
          handleEditProduct={handleEditProduct}
          handleEditUnitPrice={handleEditUnitPrice}
          handleUpdatePrice={handleUpdatePrice}
        />
      )}
      {!price.length && <EmptyContent />}
    </section>
  );
};

export default PriceTable;
