import { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import StaffPerformance from "../charts/components/StaffPerformance";
import { getUniqueEmployees } from "../utils/getUniqueEmployees";
import getEmployeeActivity from "../utils/getEmployeeActivity";

const EmployeePerformance = () => {
  const [warehouse, setWarehouse] = useState([]);
  const [hover, setHover] = useState(false);

  //get warehouse data to generate operations report with
  useEffect(() => {
    const getWarehouse = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/backup/display-backup"
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

  const handleHover = (id) => {
    if (id) {
      setHover(!hover);
    }
  };

  return (
    <Container className="text-start text-secondary">
      <div className="my-5 mb-0 text-start mx-3 text-secondary">
        <h1 className="fw-bold">Employee Performance</h1>
        <p>View employee performance over time.</p>
      </div>
      <hr />
      <div className="w-100 my-4 mx-3 mb-5">
        <div className="d-flex flex-row flex-wrap w-100 gap-3 py-3">
          {getActivity.map((element, index) => (
            <StaffPerformance
              key={index}
              element={element}
              staffName={element.employeeName}
              handleHover={(_id) => handleHover(index)}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default EmployeePerformance;
