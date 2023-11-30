import { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";

const EmployeePerformance = () => {
  const [warehouse, setWarehouse] = useState([]);
  //get warehouse data to generate operations report with
  useEffect(() => {
    const getWarehouse = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/warehouse");
        const data = res.data;
        setWarehouse(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getWarehouse();
  }, []);

  return (
    <Container className="text-start text-secondary py-5 px-1 vh-100">
      <div className="my-5 text-start mx-3 text-secondary">
        <h1 className="fw-bold">Employee Performance</h1>
        <p>View employee performance over time.</p>
      </div>
      <section>
        <h2 className="fs-6">Start Viewing Employees</h2>
      </section>
    </Container>
  );
};

export default EmployeePerformance;
