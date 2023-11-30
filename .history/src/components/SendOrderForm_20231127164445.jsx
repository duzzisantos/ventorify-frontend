import { Button, Form } from "react-bootstrap";

const SendOrderConfirmation = ({
  customerId,
  setCustomerId,
  customerName,
  setCustomerName,
  orderAsPDF,
  setOrderAsPDF,
}) => {
  return (
    <Form className="vstack gap-2">
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
        name={"orderAsPDF"}
        value={orderAsPDF}
        onChange={(e) => setOrderAsPDF(e.target.files[0])}
      />
      <Button variant="success" className="ms-auto d-flex">
        Send Order Details
      </Button>
    </Form>
  );
};

export default SendOrderConfirmation;
