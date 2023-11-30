import { Button } from "react-bootstrap";
import { CheckCircleFill, QuestionCircleFill } from "react-bootstrap-icons";

const OrdersTableBody = ({ element, handleShow, setGrabId }) => {
  const { _id, customerHasPaid, customerId, customerName, revenue } = element;

  return (
    <tr>
      <td>{_id}</td>
      <td>{customerId}</td>
      <td>{customerName}</td>
      <td>{customerHasPaid ? "Paid" : "Not paid"}</td>
      <td>{revenue ?? "Not registered"}</td>

      <td>
        <Button
          onClick={() => {
            handleShow();
            setGrabId();
          }}
          variant="transparent"
          className={`btn-sm border rounded-5 ${
            customerHasPaid ? "text-success" : "text-danger"
          }`}
        >
          {customerHasPaid ? <CheckCircleFill /> : <QuestionCircleFill />}
        </Button>
      </td>
    </tr>
  );
};

export default OrdersTableBody;
