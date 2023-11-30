import { useState } from "react";
import { Card } from "react-bootstrap";

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
    </Card>
  );
};
