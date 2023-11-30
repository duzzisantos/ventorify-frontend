import { Card, Form } from "react-bootstrap";

const StaffPerformance = ({
  staffName,
  totalStows,
  topProductStowed,
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
  employeeActivity,
}) => {
  return (
    <Card className="">
      <Card.Header className="bg-transparent fw-bold">{staffName}</Card.Header>
      <Card.Body>
        <div className="d-flex hstack">
          <Form.Label htmlFor="select year">Select Year</Form.Label>
          <Form.Select
            id="select year"
            value={selectedYear}
            onChange={setSelectedYear}
            className="form-select-sm w-50 h-25"
          >
            {[
              ...new Set(
                employeeActivity.map((item, i) => (
                  <option key={i}>
                    {new Date(item.updatedAt).getFullYear()}
                  </option>
                ))
              ),
            ]}
          </Form.Select>
          <Form.Label htmlFor="select month">Select Month</Form.Label>
          <Form.Select
            id="select month"
            value={selectedMonth}
            onChange={setSelectedMonth}
            className="form-select-sm w-50 h-25"
          >
            {[
              ...new Set(
                employeeActivity.map((item, i) => (
                  <option key={i}>
                    {new Date(item.updatedAt).getMonth() + 1}
                  </option>
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
