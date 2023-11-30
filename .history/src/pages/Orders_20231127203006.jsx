import { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import axios from "axios";

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

  return (
    <Container className="col-md-10 text-secondary text-start major-wrapper">
      <h1 className="my-5 mb-0 text-start mx-3">Orders</h1>
      <hr />
      <div className="col-md-10 my-4 mx-3 mb-5">
        <Table bordered striped responsive>
          <thead className="bg-secondary">
            <tr>
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element) => (
              <tr key={element._id}>
                <td>{element._id}</td>
                <td>{element.customerId}</td>
                <td>{element.customerName}</td>
                <td>{element.customerHasPaid ? "Paid" : "Not paid"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default Orders;
