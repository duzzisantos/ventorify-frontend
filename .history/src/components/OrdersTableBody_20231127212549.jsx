import { Button } from "react-bootstrap";
import { CheckCircleFill, QuestionCircleFill } from "react-bootstrap-icons";

const OrdersTableBody = ({ element, handleUpdatePaymentStatus }) => {
  const { _id, customerHasPaid, customerId, customerName } = element;
  return (
    <tr>
      <td>{_id}</td>
      <td>{customerId}</td>
      <td>{customerName}</td>
      <td>{customerHasPaid ? "Paid" : "Not paid"}</td>
      <td>
        <Button
          onClick={handleUpdatePaymentStatus}
          variant="transparent"
          className={`btn-sm border border-1 rounded-5 border-secondary ${
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
