import { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import axios from "axios";
import OrdersTableBody from "../components/OrdersTableBody";

const Orders = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/customer-order");
      if (res.status !== 200) {
        throw new Error(`${res.status}, ${res.statusText}`);
      } else {
        setData(res.data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleConfirmPayment = (element, _id) => {
    axios
      .put(`http://localhost:4000/api/customer-order/${_id}`, {
        customerHasPaid:
          (element.customerHasPaid && false) ||
          (!element.customerHasPaid && true),
      })
      .then((res) => {
        console.log(res.status);
      })
      .catch((err) => console.warn(err));
    getData();
  };

  const commonClasses =
    "fw-bold col-lg-2 text-success border shadow-sm rounded-2 d-flex flex-column justify-content-center align-items-center py-4 col-md-4";

  const countPaid = data.filter((d) => d.customerHasPaid).map((e) => e).length;
  const countUnpaid = data
    .filter((f) => f.customerHasPaid === false)
    .map((g) => g).length;

  return (
    <Container className="col-md-10 text-secondary text-start major-wrapper">
      <h1 className="my-5 mb-0 text-start mx-3 fw-bold">Orders</h1>
      <hr />
      <div className="col-md-10 my-4 mx-3 mb-5">
        <div className="col-12 my-3 d-flex gap-4">
          <div className={commonClasses}>
            <span>Paid</span>
            <span>{countPaid}</span>
          </div>
          <div className={commonClasses}>
            <span>Not Paid</span>
            <span>{countUnpaid}</span>
          </div>
        </div>
        <Table bordered striped responsive>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Payment Status</th>
              <th>Sales Value</th>
              {/* <th>Discount Offered</th> */}
              <th>Confirm Payment</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element) => (
              <OrdersTableBody
                key={element._id}
                element={element}
                handleUpdatePaymentStatus={() =>
                  handleConfirmPayment(element, element._id)
                }
              />
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default Orders;
