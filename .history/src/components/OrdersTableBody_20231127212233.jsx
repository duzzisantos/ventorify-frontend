import { Button } from "react-bootstrap";

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
          className={`btn-sm border ${
            customerHasPaid ? "bg-transparent" : "bg-dark"
          }`}
        ></Button>
      </td>
    </tr>
  );
};

export default OrdersTableBody;
