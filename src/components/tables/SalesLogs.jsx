import { Table, Button } from "react-bootstrap";
import { BarChartFill } from "react-bootstrap-icons";

const SalesLogs = ({
  activity,
  handleClearSalesTable,
  customDateFormat,
  preferredLanguage,
  customTimeFormat,
  EmptyContent,
}) => {
  return (
    <div className="mx-3 mb-3 text-start d-flex flex-column">
      <p className="my-p fw-bold">
        <BarChartFill /> Sales logs
      </p>
      <div className="overflow-y-auto" style={{ height: "fit-content" }}>
        <Button
          variant="danger"
          className="my-2 ms-auto hstack"
          onClick={handleClearSalesTable}
          disabled={true}
        >
          Clear sales table
        </Button>
        <Table className="text-secondary table-border" hover responsive>
          <thead className="bg-secondary text-light">
            <tr>
              <th>Category</th>
              <th>Product</th>
              <th>Revenue</th>
              <th>Date - Time</th>
            </tr>
          </thead>
          <tbody>
            {activity.map((sale) => (
              <tr key={sale._id}>
                <td>{sale.category}</td>
                <td>{sale.product}</td>
                <td>${sale.salesOperations.revenue.toPrecision(4)}</td>
                <td>
                  {customDateFormat(sale.updatedAt, preferredLanguage, "UTC")} -{" "}
                  {customTimeFormat(sale.updatedAt, preferredLanguage, "UTC")}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {!activity.length && EmptyContent}
    </div>
  );
};

export default SalesLogs;
