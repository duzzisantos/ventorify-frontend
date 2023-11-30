import React from "react";
import { Button } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";

//Modal component
const SalesTable = ({ element }) => {
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
          <td>
            <Button variant="danger">
              <Trash />
            </Button>
          </td>
          {/* <td>
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
          </td> */}
        </tr>
      </tbody>
    </>
  );
};

export default SalesTable;
