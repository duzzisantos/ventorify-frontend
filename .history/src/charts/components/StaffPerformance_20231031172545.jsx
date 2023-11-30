import { useState } from "react";
import { Card, Form } from "react-bootstrap";

const StaffPerformance = ({
  staffName,
  totalStows,
  topProductStowed,
  data,
}) => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setselectedYear] = useState(2023);
  return (
    <Card>
      <Card.Header>{staffName}</Card.Header>
      <Card.Body>
        <Form.Label>Select Year</Form.Label>
        <Form.Select
          value={selectedYear}
          onChange={(e) => selectedYear(e.target.value)}
        >
          {[
            ...new Set(
              data.map((item) => (
                <option>{new Date(item.updatedAt).getFullYear()}</option>
              ))
            ),
          ]}
        </Form.Select>
      </Card.Body>
    </Card>
  );
};
