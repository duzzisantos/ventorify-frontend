import { useState } from "react";
import { Card, Form } from "react-bootstrap";

const StaffPerformance = ({
  staffName,
  topProductStowed,

  element,
}) => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const getStowingAmount = Object.values(element.stowingHistory)
    .filter(
      (item) => item.month === selectedMonth && item.year === selectedYear
    )
    .map((file) => file.stowedAmount)
    .reduce((acc, curr) => acc + curr, 0);

  const uniqueMonths = [...new Set(element.stowingHistory.map((x) => x.month))];

  return (
    <Card className="col-md-5">
      <Card.Header className="bg-transparent fw-bold">{staffName}</Card.Header>
      <Card.Body>
        <div className="d-flex hstack">
          <Form.Label htmlFor="select year">Select Year</Form.Label>
          <Form.Select
            id="select year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="form-select-sm w-50 h-25"
          >
            {[
              ...new Set(
                element.stowingHistory.map((item, i) => (
                  <option key={i}>{item.year}</option>
                ))
              ),
            ]}
          </Form.Select>
          <Form.Label htmlFor="select month">Select Month</Form.Label>
          <Form.Select
            id="select month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="form-select-sm w-50 h-25"
          >
            {[
              ...new Set(
                element.stowingHistory.map((item, i) => (
                  <option key={i}>{item.month}</option>
                ))
              ),
            ]}
          </Form.Select>
        </div>
        <div className="d-flex gap-2">
          <div className="d-flex flex-column flex-nowrap w-50 gap-2">
            <div className="rounded-2 text-center p-2 border border-secondary d-flex flex-column">
              <small>Total Amount Stowed</small>
              {getStowingAmount}
            </div>
            <div className="rounded-2 text-center p-2 border border-secondary d-flex flex-column">
              <small>Top Stowed Products</small>
              {topProductStowed}
            </div>
          </div>
          <div>Employee Picture here</div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default StaffPerformance;
