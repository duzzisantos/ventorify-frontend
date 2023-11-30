import { useState } from "react";
import { Card, Form } from "react-bootstrap";
import { getTopStowedProduct } from "../../utils/getTopStowedProduct";

const StaffPerformance = ({ staffName, element }) => {
  const uniqueMonths = [...new Set(element.stowingHistory.map((x) => x.month))];
  const uniqueYears = [...new Set(element.stowingHistory.map((x) => x.year))];

  const [selectedMonth, setSelectedMonth] = useState(uniqueMonths[0]);
  const [selectedYear, setSelectedYear] = useState(uniqueYears[0]);

  //Total stowed amounts per time period querying with month and year
  const getStowingAmount = element.stowingHistory
    .filter(
      (item) => item.year === selectedYear && item.month === selectedMonth
    )
    .map((file) => file.stowedAmount)
    .reduce((acc, curr) => acc + curr, 0);

  //Get the highest occuring product from querying a particular month and year, and call the first index
  const getTopProduct = getTopStowedProduct(
    element,
    selectedMonth,
    selectedYear
  );

  return (
    <Card className="col-md-5 col-lg-5 border shadow-sm">
      <Card.Header className="bg-transparent fw-bold text-success">
        {staffName}
      </Card.Header>
      <Card.Body>
        <div className="d-flex hstack">
          <Form.Label htmlFor="select year" className="fw-bold">
            Select Year
          </Form.Label>
          <Form.Select
            id="select year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="form-select-sm w-50 h-25"
          >
            {uniqueYears
              .sort((prev, next) => prev - next)
              .map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
          </Form.Select>
          <Form.Label htmlFor="select month" className="fw-bold">
            Select Month
          </Form.Label>
          <Form.Select
            id="select month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="form-select-sm w-50 h-25"
          >
            {uniqueMonths
              .sort((prev, next) => prev - next)
              .map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
          </Form.Select>
        </div>
        <div className="d-flex gap-2">
          <div className="d-flex gap-2 col-12 mt-4">
            <div className="rounded-2 text-center p-2 border d-flex flex-column col-6">
              <small className="fw-bold ">Total Goods Stowed</small>
              <small className="text-success fw-bold">
                {getStowingAmount ?? 0}
              </small>
            </div>
            <div className="rounded-2 text-center p-2 border d-flex flex-column col-6">
              <small className="fw-bold">Top Product</small>
              <small className="text-success">
                {getTopProduct ?? "Not applicable"}
              </small>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default StaffPerformance;
