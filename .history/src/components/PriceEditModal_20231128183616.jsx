import { Button, Form, Modal } from "react-bootstrap";
import { Tags, Diagram3Fill, CurrencyEuro } from "react-bootstrap-icons";

const PriceEditModal = ({
  show,
  _id,
  product,
  category,
  unitPrice,
  handleUpdatePrice,
  handleEditCategory,
  handleEditProduct,
  handleClose,
  handleEditUnitPrice,
}) => {
  return (
    <Modal
      backdrop="static"
      keyboard={false}
      size="lg"
      onHide={handleClose}
      show={show}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit price for #{_id}</Modal.Title>
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
              onChange={handleEditCategory}
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
              onChange={handleEditProduct}
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
              onChange={handleEditUnitPrice}
            />
          </div>
          <div className="hstack ms-auto justify-content-end gap-2">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="success"
              type="submit"
              onClick={() => handleUpdatePrice(_id)}
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
