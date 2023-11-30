import React from "react";
import { Card, Button } from "react-bootstrap";

const SalesModal = ({
  element,
  quantity,
  setQuantity,
  customerId,
  setcustomerId,
  customerName,
  setCustomerName,
  customerPhone,
  setCustomerPhone,
  customerAddress,
  setCustomerAddress,
  sellItem,
  showModal,
  setShowModal,
  handleReset,
}) => {
  //filters out errors due to negative numbers. Only positive integers are allowed
  const getRemainingGoods = () => {
    if (element.totalProductCount && quantity) {
      if (quantity <= 0) {
        return element.totalProductCount;
      } else if (quantity > 0) {
        return element.totalProductCount - quantity;
      }
    }
  };

  return (
    <Card
      className={`w-100 border border-light rounded-1 shadow-sm fs-6 my-2 p-2 ${
        showModal ? "d-block" : "d-none"
      }`}
    >
      <form className="text-start">
        <label htmlFor="quantitySold">{element.product}</label>
        <output>{getRemainingGoods()} left</output>
        <input
          key={element._id + "quantitySold"}
          className="w-100 mb-2"
          type={"number"}
          value={quantity}
          onChange={setQuantity}
          name="quantitySold"
          id="quantitySold"
        />

        <label htmlFor="customerId">Customer ID</label>
        <input
          type="text"
          key={element._id + "customerId"}
          className="w-100 mb-2"
          value={customerId}
          onChange={setcustomerId}
          name="customerId"
          id="customerId"
        />

        <label htmlFor="customerName">Customer Name</label>
        <input
          type="text"
          key={element._id + "customerName"}
          className="w-100 mb-2"
          value={customerName}
          onChange={setCustomerName}
          name="customerName"
          id="customerName"
        />

        <label htmlFor="customerPhone">Customer Phone</label>
        <input
          type="tel"
          key={element._id + "customerPhone"}
          className="w-100 mb-2"
          value={customerPhone}
          onChange={setCustomerPhone}
          name="customerPhone"
          id="customerPhone"
        />

        <label htmlFor="customerAddress">Customer Address</label>
        <input
          type="text"
          key={element._id + "customerAddress"}
          className="w-100 mb-2"
          value={customerAddress}
          onChange={setCustomerAddress}
          name="customerAddress"
          id="customerAddress"
        />

        <div className="d-flex flex-row flex-nowrap hstack gap-1">
          <Button className="btn-sm btn-success" onClick={sellItem}>
            Sell
          </Button>
          <Button
            className="btn-sm btn-danger"
            onClick={() => setShowModal(false)}
          >
            Close
          </Button>
          <Button
            className="btn-sm border-2 border-secondary text-dark bg-transparent"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default SalesModal;
