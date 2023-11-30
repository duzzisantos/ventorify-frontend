import { Button, Form } from "react-bootstrap";

const SendOrderConfirmation = ({
  customerId,
  setCustomerId,
  customerName,
  setCustomerName,
  setOrderAsPDF,
  handleSubmit,
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
      <Form.Control type="file" name="customerOrderAsPDF" />
      <Button
        variant="success"
        className="ms-auto d-flex"
        onClick={handleSubmit}
      >
        Send Order Details
      </Button>
    </Form>
  );
};

export default SendOrderConfirmation;
