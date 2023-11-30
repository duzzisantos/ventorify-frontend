import { Table, Button } from "react-bootstrap";
import { HouseFill } from "react-bootstrap-icons";
import EmptyContent from "../EmptyContent";

const WarehouseLogs = ({
  warehouse,
  handleDeleteLogs,
  customDateFormat,
  preferredLanguage,
}) => {
  return (
    <div className="mx-3 text-start d-flex flex-column">
      <p className="my-p fw-bold">
        <HouseFill /> Warehouse logs
      </p>
      <div className="overflow-y-auto" style={{ height: "fit-content" }}>
        <Button
          variant="danger"
          className="mb-2 ms-auto d-flex"
          onClick={handleDeleteLogs}
        >
          Delete logs
        </Button>
        <Table className="text-secondary table-border" hover responsive>
          <thead className="text-white bg-secondary">
            <tr>
              {/* <th>S.No</th> */}
              <th>Category</th>
              <th>Product</th>
              <th>Responsible staff</th>
              <th>Amount stowed</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto">
            {warehouse.map((task) => (
              <tr key={task._id}>
                <td>{task.category}</td>
                <td>{task.product}</td>
                <td>{task.officerName}</td>
                <td>{task.batchAmount}</td>
                <td>
                  {customDateFormat(
                    task.firstEntryDate,
                    preferredLanguage,
                    "UTC"
                  )}{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {!warehouse.length && <EmptyContent />}
    </div>
  );
};

export default WarehouseLogs;
