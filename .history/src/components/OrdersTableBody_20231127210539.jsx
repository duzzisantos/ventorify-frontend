import { Button } from "react-bootstrap";

const OrdersTableBody = (element, handleUpdatePaymentStatus) => {
  return (
    <tr key={element._id}>
      <td>{element._id}</td>
      <td>{element.customerId}</td>
      <td>{element.customerName}</td>
      <td>{element.customerHasPaid ? "Paid" : "Not paid"}</td>
    </tr>
  );
};
