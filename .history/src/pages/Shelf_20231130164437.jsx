import React, { useState, useEffect } from "react";
import { Table, Container, Button, Modal } from "react-bootstrap";
import axios from "axios";
import ShelfBody from "../charts/components/ShelfBody";
import SalesTable from "../components/SalesTable";
import EmptyContent from "../components/EmptyContent";
import ShoppingBasket from "../components/ShoppingBasket";
import { Plus } from "react-bootstrap-icons";
import TransferToShelf from "../components/tables/TransferToShelf";

const Shelf = () => {
  const [goods, setGoods] = useState([]);
  const [warehouse, setWarehouse] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setcustomerAddress] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(0);

  const getWarehouseData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/aggregate-goods");
      setWarehouse(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getAggregateShelfData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/aggregate-shelf-items"
      );
      const data = res.data;
      setGoods(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getWarehouseData();
    getAggregateShelfData();
  }, []);

  //Here we update the model's properties. Initially, no inventory has left warehouse.
  const handleTransferToShelf = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:4000/api/aggregate-goods/${id}`
      );
      console.log(res.data.message);
    } catch (err) {
      console.log(err.message);
    }
    getWarehouseData();
    getAggregateShelfData();
  };

  //dangerous api calls
  const handleClearShelf = () => {
    axios
      .delete("http://localhost:4000/api/aggregate-shelf-items")
      .then(() => {
        console.log("Successfully cleared shelf");
      })
      .catch(() => {
        console.log("Clearing shelf was not successful");
      });
  };

  // dangerous api calls
  const handleClearAggregateWarehouse = () => {
    axios
      .delete("http://localhost:4000/api/warehouse")
      .then(() => {
        console.log("Deleted aggregate goods");
      })
      .catch(() => {
        console.warn(
          "Could not delete aggregate goods. Either the API is not ready or there is nothing to delete"
        );
      });
  };

  const handleShowCart = () => {
    setShowCart(!showCart);
  };

  return (
    <Container className="col-md-10 text-secondary">
      <div className="my-5 text-start mx-3">
        <h1 className="fw-semibold">Shelf</h1>
        <p>
          View products currently stocked in shelf. Determine when an order has
          to be placed in warehouse.
        </p>
      </div>
      <div
        className="my-4 mx-3 overflow-auto"
        style={{ height: "fit-content" }}
      >
        <ShelfBody data={goods} />
      </div>

      <div className="my-4 mx-4 vstack gap-3">
        <TransferToShelf
          handleTransferToShelf={handleTransferToShelf}
          handleClearAggregateWarehouse={handleClearAggregateWarehouse}
          warehouse={warehouse}
        />

        <section className="overflow-y-auto my-5">
          <h4 className="text-start fw-semibold">
            Shelved items ready for sales
          </h4>
          <Button
            className="justify-content-end hstack my-3 btn btn-success ms-auto d-flex"
            onClick={handleShowCart}
          >
            Create Sales Order <Plus />
          </Button>
          {showCart && (
            <Modal
              show={showCart}
              onHide={() => setShowCart(false)}
              backdrop="static"
              centered
              size="lg"
              className="overflow-y-auto"
            >
              <Modal.Header
                className="bg-light"
                closeButton
                closeVariant="dark"
              >
                <Modal.Title>Current Customer Order</Modal.Title>
              </Modal.Header>
              <Modal.Body className="bg-light">
                <ShoppingBasket
                  getShelfData={goods}
                  selectedProduct={selectedProduct}
                  setSelectedProduct={(e) => setSelectedProduct(e.target.value)}
                  selectedQuantity={selectedQuantity}
                  setSelectedQuantity={(e) =>
                    setSelectedQuantity(e.target.value)
                  }
                  customerAddress={customerAddress}
                  setCustomerAddress={(e) => setcustomerAddress(e.target.value)}
                  customerId={customerId}
                  setCustomerId={(e) => setCustomerId(e.target.value)}
                  customerName={customerName}
                  setCustomerName={(e) => setCustomerName(e.target.value)}
                  customerPhone={customerPhone}
                  setCustomerPhone={(e) => setCustomerPhone(e.target.value)}
                />
              </Modal.Body>
            </Modal>
          )}
          <Table className="text-secondary mb-5 table-border" responsive hover>
            <thead className="bg-secondary text-light">
              <tr>
                <th>Category</th>
                <th>Product</th>
                <th>Economic Order Quantity</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            {goods.map(
              (item, index) =>
                item && <SalesTable element={item} key={`${item}-${index}`} />
            )}
          </Table>
          <div className="d-flex gap-3 ms-auto">
            <Button onClick={handleClearShelf} variant="danger" disabled={true}>
              Clear Shelf
            </Button>
          </div>
        </section>
        {!goods.length && <EmptyContent />}
      </div>
    </Container>
  );
};

export default Shelf;
