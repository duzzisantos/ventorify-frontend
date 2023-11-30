import React, { useState } from "react";
import { Button } from "react-bootstrap";
import SalesModal from "./sales-modal";

import axios from "axios";

//Modal component
const SalesTable = ({ element }) => {
  const [soldQuantity, setSoldQuantity] = useState(0);
  const [show, setShow] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setcustomerAddress] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  //send the put request from the shelf to the sales collections and return the quantity
  //input in the sales form - to effect change in the shelf quantity, and calculate revenue
  //in the sales collection

  const handleSell = async (product) => {
    const postObject = {
      ...element,
      quantitySold: soldQuantity,
      customerId: customerId,
      customerName: customerName,
      customerPhone: customerPhone,
      customerAddress: customerAddress,
    };

    try {
      const res = await axios.put(
        `http://localhost:4000/api/sales/${product}`,
        postObject
      );
      console.log(res.data.message);
    } catch (err) {
      console.log(err.message);
    }
  };

  //Reset any sales form
  const handleReset = () => {
    setCustomerId("");
    setCustomerName("");
    setCustomerPhone("");
    setcustomerAddress("");
    setSoldQuantity(0);
  };

  return (
    <>
      <tbody>
        <tr
          className={`border-bottom border-black`}
          key={element._id}
          style={{ height: `${show ? "150px" : ""}` }}
        >
          <td>{element.category}</td>
          <td>{element.product}</td>
          <td>{element.economicOrderQuantity}</td>
          <td>{element.totalProductCount}</td>
          <td
            className={
              element.totalProductCount < 100 ? "text-danger" : "text-success"
            }
          >
            {element.totalProductCount < 100
              ? "Stockout soon"
              : "Adequate stock"}
          </td>
          <td>
            <div>
              <Button
                className="btn bg-transparent border border-secondary text-secondary"
                onClick={() => setShow(true)}
              >
                Schedule sale
              </Button>

              <div className={`d-flex flex-column`}>
                <SalesModal
                  element={element}
                  quantity={soldQuantity}
                  setQuantity={(e) => setSoldQuantity(e.target.value)}
                  sellItem={() => handleSell(element.product)}
                  showModal={show}
                  setShowModal={setShow}
                  customerId={customerId}
                  setCustomerId={(e) => setCustomerId(e.target.value)}
                  customerAddress={customerAddress}
                  setCustomerAddress={(e) => setcustomerAddress(e.target.value)}
                  customerName={customerName}
                  setCustomerName={(e) => setCustomerName(e.target.value)}
                  customerPhone={customerPhone}
                  setCustomerPhone={(e) => setCustomerPhone(e.target.value)}
                  handleReset={handleReset}
                />
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default SalesTable;
