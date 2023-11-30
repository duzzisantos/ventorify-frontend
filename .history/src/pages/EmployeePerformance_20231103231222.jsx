import { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import StaffPerformance from "../charts/components/StaffPerformance";
import { getUniqueEmployees } from "../utils/getUniqueEmployees";
import getEmployeeActivity from "../utils/getEmployeeActivity";

const EmployeePerformance = () => {
  const [warehouse, setWarehouse] = useState([]);

  //get warehouse data to generate operations report with
  useEffect(() => {
    const getWarehouse = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/backup-warehouse"
        );
        const data = res.data;
        setWarehouse(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getWarehouse();
  }, []);

  const getActivity = getEmployeeActivity(getUniqueEmployees, warehouse);

  return (
    <Container className="text-start text-secondary py-5 px-1 vh-100">
      <div className=" text-start mx-3 text-secondary">
        <h1 className="fw-bold">Employee Performance</h1>
        <p>View employee performance over time.</p>
      </div>
      <section className="w-100 my-4 mx-3 mb-5">
        <h2 className="fs-6 fw-bold">
          Filter employee performance based on time period
        </h2>
        <div className="d-flex flex-row flex-wrap w-100 gap-3 py-3">
          {getActivity.map((element, index) => (
            <StaffPerformance
              key={index}
              element={element}
              staffName={element.employeeName}
            />
          ))}
        </div>
      </section>
    </Container>
  );
};

export default EmployeePerformance;
