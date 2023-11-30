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

  const getEmployeeActivity = () => {
    const result = [];
    uniqueEmployeeActivity.forEach((employee) => {
      const uniqueYears = [
        ...new Set(
          Object.values(employee).map((element) =>
            new Date(element.updatedAt).getFullYear()
          )
        ),
      ];

      const uniqueMonths = [
        ...new Set(
          Object.values(employee).map((item) =>
            new Date(item.updatedAt).getMonth()
          )
        ),
      ];

      const employeeStowingHistory = Object.values(employee).map((item) => ({
        year: uniqueYears.toString(),
        month: (uniqueMonths + 1).toString(),
        frequency: Object.values(employee)
          .filter((el) =>
            uniqueMonths.includes(
              new Date(el.updatedAt).getMonth() &&
                uniqueYears.includes(new Date(el.updatedAt).getFullYear())
            )
          )
          .map((item) => item.batchAmount)
          .reduce((acc, curr) => acc + curr, 0),
      }));

      result.push({
        employeeName: [
          ...new Set(Object.values(employee).map((item) => item.officerName)),
        ].join(""),
        stowingHistory: employeeStowingHistory,
        topProductsStowed: [],
      });
    });
    return result;
  };

  console.log(getEmployeeActivity());

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
