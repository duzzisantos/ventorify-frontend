import { Button } from "react-bootstrap";

const OrdersTableBody = (element, handleUpdatePaymentStatus) => {
  return (
    <tr>
      <td>{element._id}</td>
      <td>{element.customerId}</td>
      <td>{element.customerName}</td>
      <td>{element.customerHasPaid ? "Paid" : "Not paid"}</td>
      <td>
        <Button
          onClick={handleUpdatePaymentStatus}
          className={`btn-sm border ${
            element.customerHasPaid ? "bg-transparent text-dark" : "bg-dark"
          }`}
        >
          Confirm payment
        </Button>
      </td>
    </tr>
  );
};

export default OrdersTableBody;
