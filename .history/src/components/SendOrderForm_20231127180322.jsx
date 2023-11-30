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
  const handleConvertFiles = (e) => {
    let file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        let selectedFileB64 = ev.target.split(","[1]);
        console.log(selectedFileB64);
      };
      reader.readAsDataURL(file);
    }
  };
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
      <Form.Control
        type="file"
        name="orderAsPDF"
        onChange={(e) => setOrderAsPDF(handleConvertFiles(e))}
      />
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
