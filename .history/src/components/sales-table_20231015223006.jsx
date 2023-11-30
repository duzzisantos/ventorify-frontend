// import React, { useState } from "react";
// import { Button } from "react-bootstrap";
// import SalesModal from "./sales-modal";

// import axios from "axios";

//Modal component
const SalesTable = ({ element }) => {
  // const [soldQuantity, setSoldQuantity] = useState(0);
  // const [show, setShow] = useState(false);
  // const [customerId, setCustomerId] = useState("");
  // const [customerName, setCustomerName] = useState("");
  // const [customerAddress, setcustomerAddress] = useState("");
  // const [customerPhone, setCustomerPhone] = useState("");

  //send the put request from the shelf to the sales collections and return the quantity
  //input in the sales form - to effect change in the shelf quantity, and calculate revenue
  //in the sales collection

  // const handleSell = async (product) => {
  //   const postObject = {
  //     ...element,
  //     quantitySold: soldQuantity,
  //     customerId: customerId,
  //     customerName: customerName,
  //     customerPhone: customerPhone,
  //     customerAddress: customerAddress,
  //   };

  //   try {
  //     const res = await axios.put(
  //       `http://localhost:4000/api/sales/${product}`,
  //       postObject
  //     );
  //     console.log(res.data.message);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  // //Reset any sales form
  // const handleReset = () => {
  //   setCustomerId("");
  //   setCustomerName("");
  //   setCustomerPhone("");
  //   setcustomerAddress("");
  //   setSoldQuantity(0);
  // };

  return (
    <>
      <tbody>
        <tr
          className={`border-bottom border-black`}
          key={element._id}
          // style={{ height: `${show ? "150px" : ""}` }}
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
        </tr>
      </tbody>
    </>
  );
};

export default SalesTable;
