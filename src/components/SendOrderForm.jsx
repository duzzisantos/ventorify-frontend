import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { http } from "../api-calls/http";

const SendOrderConfirmation = ({
  customerId,
  setCustomerId,
  customerName,
  setCustomerName,
  customerOrderAsPDF,
  setCustomerOrderAsPDF,
  revenue,
  setRevenue,
  accessToken,
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

  const { isLocal, isProduction, localhost, webhost } = http;

  //Handles sales order confirmation by sending a PDF file to the customer as confirmation
  const sendConfirmation = () => {
    axios
      .post(
        isLocal
          ? `${localhost}/api/customer-order`
          : isProduction && `${webhost}/api/customer-order`,
        {
          customerId,
          customerName,
          customerOrderAsPDF,
          revenue,
          customerHasPaid: false,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
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
