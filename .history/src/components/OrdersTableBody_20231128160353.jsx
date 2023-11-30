import { Button } from "react-bootstrap";
import { CheckCircleFill, QuestionCircleFill } from "react-bootstrap-icons";

const OrdersTableBody = ({ element, handleUpdatePaymentStatus }) => {
  const {
    _id,
    customerHasPaid,
    customerId,
    customerName,
    revenue,
    customerManager,
  } = element;
  const { offerDiscount } = customerManager;
  return (
    <tr>
      <td>{_id}</td>
      <td>{customerId}</td>
      <td>{customerName}</td>
      <td>{customerHasPaid ? "Paid" : "Not paid"}</td>
      <td>{revenue ?? "Not registered"}</td>
      <td>{offerDiscount ? <CheckCircleFill /> : <QuestionCircleFill />}</td>
      <td>
        <Button
          onClick={handleUpdatePaymentStatus}
          variant="transparent"
          className={`btn-sm rounded-5 ${
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
