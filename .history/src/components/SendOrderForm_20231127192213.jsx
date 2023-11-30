import { Button, Form } from "react-bootstrap";
import axios from "axios";
const SendOrderConfirmation = ({
  customerId,
  setCustomerId,
  customerName,
  setCustomerName,
  customerOrderAsPDF,
  setCustomerOrderAsPDF,
}) => {
  const sendConfirmation = () => {
    const [file] = document.querySelector("input[type=file]").files;
    const aspdfString = document.getElementById("customerOrderAsPDF");
    const reader = new FileReader();
    reader.onload = () => {
      aspdfString.value = reader.result;
    };
    if (file) {
      reader.readAsText(file);
    }

    const x = aspdfString.value;
    axios
      .post("http://localhost:4000/api/customer-order", {
        customerId,
        customerName,
        x,
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
      <Form.Control type="file" name="customerOrderAsPDF" />
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
