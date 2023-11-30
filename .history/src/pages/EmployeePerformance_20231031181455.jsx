import { useState, useEffect } from "react";
import axios from "axios";
import getEmployeePerformance from "../utils/getEmployeePerformance";
import { Container } from "react-bootstrap";
import StaffPerformance from "../charts/components/StaffPerformance";

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

  const topProductStowed = [
    ...new Set(employeeRecord.map((element) => element.topProductStowed)),
  ];

  const totalStows = employeeRecord
    .map((item) => item)
    .reduce((acc, curr) => acc + curr, 0);

  const staffName = employeeRecord.map((record) => record.staffName).join("");

  return (
    <Container className="text-start text-secondary py-5 px-1 vh-100">
      <div className=" text-start mx-3 text-secondary">
        <h1 className="fw-bold">Employee Performance</h1>
        <p>View employee performance over time.</p>
      </div>
      <section className="col-md-10 my-4 mx-3 mb-5">
        <h2 className="fs-6 fw-bold">Start Viewing Employees</h2>
        <StaffPerformance
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          data={warehouse}
          staffName={staffName}
          totalStows={totalStows}
          topProductStowed={topProductStowed}
        />
      </section>
    </Container>
  );
};

export default EmployeePerformance;
