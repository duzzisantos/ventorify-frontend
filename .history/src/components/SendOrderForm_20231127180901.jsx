import { Button, Form } from "react-bootstrap";

const SendOrderConfirmation = ({
  customerId,
  setCustomerId,
  customerName,
  setCustomerName,
  orderAsPDF,
  setOrderAsPDF,
  handleSubmit,
}) => {
  const handleConvertFiles = () => {};
  return (
    <Form className="vstack gap-2" onSubmit={handleSubmit}>
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
      <Form.Control
        type="file"
        name="orderAsPDF"
        onChange={(e) => setOrderAsPDF(e.target.files[0])}
      />
      <Button variant="success" type="sumbit" className="ms-auto d-flex">
        Send Order Details
      </Button>
    </Form>
  );
};

export default SendOrderConfirmation;
