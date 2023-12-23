import { useState, useEffect } from "react";
import axios from "axios";
import { http } from "../api-calls/http";
import { Container } from "react-bootstrap";
import StaffPerformance from "../charts/components/StaffPerformance";
import { getUniqueEmployees } from "../utils/getUniqueEmployees";
import getEmployeeActivity from "../utils/getEmployeeActivity";

const EmployeePerformance = ({ accessToken }) => {
  const [warehouse, setWarehouse] = useState([]);
  const [hover, setHover] = useState(false);

  const { isLocal, isProduction, localhost, webhost } = http;

  //Get warehouse data to generate operations report with
  useEffect(() => {
    const getWarehouse = async () => {
      try {
        const res = await axios.get(
          isLocal
            ? `${localhost}/api/backup/display-backup`
            : isProduction && `${webhost}/api/backup/display-backup`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        const data = res.data;
        setWarehouse(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getWarehouse();
  }, [isLocal, isProduction, localhost, webhost, accessToken]);

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
