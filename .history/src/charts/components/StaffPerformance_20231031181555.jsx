import { Card, Form } from "react-bootstrap";

const StaffPerformance = ({
  staffName,
  totalStows,
  topProductStowed,
  data,
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
}) => {
  return (
    <Card className="col-lg-3 col-md-4">
      <Card.Header>{staffName}</Card.Header>
      <Card.Body>
        <div className="d-flex justify-content-between">
          <Form.Label htmlFor="select year">Select Year</Form.Label>
          <Form.Select
            id="select year"
            value={selectedYear}
            onChange={setSelectedYear}
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
            onChange={setSelectedMonth}
          >
            {[
              ...new Set(
                data.map((item) => (
                  <option>{new Date(item.updatedAt).getMonth() + 1}</option>
                ))
              ),
            ]}
          </Form.Select>
        </div>
        <div className="d-flex flex-colum flex-nowrap hstack gap-2">
          <div className="rounded-2 text-center p-2">{totalStows}</div>
          <div className="rounded-2 text-center p-2">{topProductStowed}</div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default StaffPerformance;
