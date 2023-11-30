import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

import { Tags, Diagram3Fill, CurrencyEuro } from "react-bootstrap-icons";

const PriceEditModal = ({ setShow, show, _id }) => {
  const [product, setProduct] = useState("");
  const [category, setCategory] = useState("");
  const [unitPrice, setUnitPrice] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/price-list/${_id}`)
      .then((res) => {
        const data = res.data;
        setProduct(data.product);
        setCategory(data.category);
        setUnitPrice(data.unitPrice);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [_id]);

  const handleUpdatePrice = () => {
    axios
      .put(`http://localhost:4000/api/price-list/${_id}`, {
        product,
        category,
        unitPrice,
      })
      .then((res) => {
        console.log(res.statusText);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Modal backdrop="static" keyboard={false} onHide={handleClose} show={show}>
      <Modal.Header closeButton>
        <Modal.Title>Edit price for {_id}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column">
        <Form encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              <Diagram3Fill /> Category
            </label>
            <Form.Control
              id="category"
              name="category"
              className="text-uppercase"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <hr />
          <div className="mb-3">
            <label htmlFor="product" className="form-label">
              <Tags /> Product
            </label>
            <Form.Control
              id="product"
              name="product"
              className="text-uppercase"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />
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
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
            />
          </div>
          <div className="hstack ms-auto justify-content-end gap-2">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="success"
              type="submit"
              onClick={handleUpdatePrice(_id)}
            >
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PriceEditModal;
