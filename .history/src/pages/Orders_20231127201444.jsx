import { useState, useEffect, useMemo } from "react";
import { Container } from "react-bootstrap";
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
      <div className="col-md-10 my-4 mx-3 mb-5">Lol</div>
    </Container>
  );
};

export default Orders;
