import { useState } from "react";
import { Card, Form } from "react-bootstrap";

const StaffPerformance = ({
  staffName,
  totalStows,
  topProductStowed,
  data,
}) => {
  const [selectedMonth, setSelectedMonth] = useState("");
  return (
    <Card>
      <Card.Header>{staffName}</Card.Header>
      <Card.Body>
        <Form.Label>Select Year</Form.Label>
        <Form.Select>
          {[
            ...new Set(
              data.map((item) => new Date(item.updatedAt).getFullYear())
            ),
          ]}
        </Form.Select>
      </Card.Body>
    </Card>
  );
};
