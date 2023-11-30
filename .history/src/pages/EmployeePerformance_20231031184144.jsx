import { useState, useEffect } from "react";
import axios from "axios";
import getEmployeePerformance from "../utils/getEmployeePerformance";
import { Container } from "react-bootstrap";
import StaffPerformance from "../charts/components/StaffPerformance";
import { getUniqueEmployees } from "../utils/getUniqueEmployees";

const EmployeePerformance = () => {
  const [warehouse, setWarehouse] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedYear, setSelectedYear] = useState(2023);
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

  const employeeRecord = getEmployeePerformance(
    warehouse,
    selectedMonth,
    selectedYear
  );

  const uniqueEmployeeActivity = getUniqueEmployees(warehouse);
  console.log(uniqueEmployeeActivity);

  const topProductStowed = [
    ...new Set(employeeRecord.map((element) => element.topProductStowed)),
  ];

  const totalStows = employeeRecord
    .map((item) => item)
    .reduce((acc, curr) => acc + curr, 0);

  return (
    <Container className="text-start text-secondary py-5 px-1 vh-100">
      <div className=" text-start mx-3 text-secondary">
        <h1 className="fw-bold">Employee Performance</h1>
        <p>View employee performance over time.</p>
      </div>
      <section className="col-md-10 my-4 mx-3 mb-5">
        <h2 className="fs-6 fw-bold">Start Viewing Employees</h2>
        <div className="d-flex gap-3 flex-wrap">
          {uniqueEmployeeActivity.map((element, index) => (
            <StaffPerformance
              key={index}
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              employeeActivity={uniqueEmployeeActivity}
              staffName={element.officerName}
              totalStows={totalStows}
              topProductStowed={topProductStowed}
            />
          ))}
        </div>
      </section>
    </Container>
  );
};

export default EmployeePerformance;
