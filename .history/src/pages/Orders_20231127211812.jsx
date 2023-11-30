import { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import axios from "axios";
import OrdersTableBody from "../components/OrdersTableBody";

const Orders = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
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
  };

  return (
    <Container className="col-md-10 text-secondary text-start major-wrapper">
      <h1 className="my-5 mb-0 text-start mx-3">Orders</h1>
      <hr />
      <div className="col-md-10 my-4 mx-3 mb-5">
        <Table bordered striped responsive>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Payment Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element) => (
              <OrdersTableBody key={element._id} element={element} />
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default Orders;
