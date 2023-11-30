import { Form } from "react-bootstrap";

const SendOrderConfirmation = ({
  customerId,
  setCustomerId,
  customerName,
  setCustomerName,
  orderAsPDF,
  setOrderAsPDF,
}) => {
  return (
    <Form>
      <Form.Control
        value={customerId}
        name={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
      />
      <Form.Control
        value={customerName}
        name={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />
      <input
        type="file"
        name={orderAsPDF}
        value={orderAsPDF}
        onChange={(e) => setOrderAsPDF(e.target.value)}
      />
    </Form>
  );
};
