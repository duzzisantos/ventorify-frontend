import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";
import { Tags, Diagram3Fill, CurrencyEuro } from "react-bootstrap-icons";

const PriceEditModal = ({
  setShow,
  show,
  _id,
  product,
  setProductEdit,
  category,
  setCategoryEdit,
  unitPrice,
  setUnitPriceEdit,
}) => {
  const handleUpdatePrice = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/price-list/${_id}`
        // {
        //   product,
        //   category,
        //   unitPrice,
        // }
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

  return (
    <Modal backdrop="static" keyboard={false} onHide={handleClose} show={show}>
      <Modal.Header closeButton>
        <Modal.Title>Edit price for {_id}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column">
        <Form>
          <div className="mb-3">
            <label htmlFor="category-edit" className="form-label">
              <Diagram3Fill /> Category
            </label>
            <Form.Control
              id="category-edit"
              name="category-edit"
              className="text-uppercase"
              value={category}
              onChange={(e) => setCategoryEdit(e.target.value)}
            />
          </div>
          <hr />
          <div className="mb-3">
            <label htmlFor="product-edit" className="form-label">
              <Tags /> Product
            </label>
            <Form.Control
              id="product-edit"
              name="product-edit"
              value={product}
              onChange={(e) => setProductEdit(e.target.value)}
            />
          </div>
          <hr />

          <div className="mb-3">
            <label htmlFor="price-edit" className="form-label">
              <CurrencyEuro /> Price (Euro)
            </label>
            <input
              type="number"
              className="form-control"
              name="price-edit"
              id="price-edit"
              value={unitPrice}
              onChange={(e) => setUnitPriceEdit(e.target.value)}
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
