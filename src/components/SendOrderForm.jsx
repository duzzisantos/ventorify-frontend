import { Button, Form } from "react-bootstrap";
import axios from "axios";
const SendOrderConfirmation = ({
  customerId,
  setCustomerId,
  customerName,
  setCustomerName,
  customerOrderAsPDF,
  setCustomerOrderAsPDF,
  revenue,
  setRevenue,
}) => {
  const handleGenerateBinaryText = () => {
    const [file] = document.querySelector("input[type=file]").files;
    const reader = new FileReader();
    reader.onload = () => {
      setCustomerOrderAsPDF(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file); //do not change - otherwise the flow breaks PDF (corrupts)
    }
  };
  const sendConfirmation = () => {
    axios
      .post("http://localhost:4000/api/customer-order", {
        customerId,
        customerName,
        customerOrderAsPDF,
        revenue,
        customerHasPaid: false,
      })
      .then((res) => {
        console.log(res.statusText);
      })
      .catch((err) => console.warn(err));
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
        value={revenue}
        name={revenue}
        onChange={(e) => setRevenue(e.target.value)}
      />
      <Form.Control type="file" name="customerOrderAsPDF" />
      <Button
        size="sm"
        variant="transparent"
        className="border"
        style={{ width: "80px" }}
        onClick={handleGenerateBinaryText}
      >
        Preview
      </Button>
      <Form.Control id="customerOrderAsPDF" name="customerOrderAsPDF" />

      <Button
        variant="success"
        className="ms-auto d-flex"
        onClick={sendConfirmation}
      >
        Send Order Details
      </Button>
    </Form>
  );
};

export default SendOrderConfirmation;
