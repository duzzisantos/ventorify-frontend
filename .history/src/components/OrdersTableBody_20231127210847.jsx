import { Button } from "react-bootstrap";

const OrdersTableBody = (element, handleUpdatePaymentStatus) => {
  return (
    <tr>
      <td>{element._id}</td>
      <td>{element.customerId}</td>
      <td>{element.customerName}</td>
      <td>{element.customerHasPaid ? "Paid" : "Not paid"}</td>
      <td>
        <Button className="btn-sm border bd-transparent text-dark">
          Confirm payment
        </Button>
      </td>
    </tr>
  );
};
