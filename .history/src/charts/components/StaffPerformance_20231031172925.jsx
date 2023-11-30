import { useState } from "react";
import { Card, Form } from "react-bootstrap";

const StaffPerformance = ({
  staffName,
  totalStows,
  topProductStowed,
  data,
}) => {
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(2023);
  return (
    <Card>
      <Card.Header>{staffName}</Card.Header>
      <Card.Body>
        <Form.Label htmlFor="select year">Select Year</Form.Label>
        <Form.Select
          id="select year"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {[
            ...new Set(
              data.map((item) => (
                <option>{new Date(item.updatedAt).getFullYear()}</option>
              ))
            ),
          ]}
        </Form.Select>
        <Form.Label htmlFor="select month">Select Month</Form.Label>
        <Form.Select
          id="select month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {[
            ...new Set(
              data.map((item) => (
                <option>{new Date(item.updatedAt).getMonth()}</option>
              ))
            ),
          ]}
        </Form.Select>
      </Card.Body>
    </Card>
  );
};
