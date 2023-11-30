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
  const convertFilesB64 = (file) => {
    new Promise((res, rej) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        res(reader.result);
      };

      reader.onerror = (err) => {
        rej(err);
      };
    });
  };

  const useConversion = async () => {
    const result = await convertFilesB64(orderAsPDF).catch((err) => Error(err));
    if (result instanceof Error) {
      console.log("Error: ", result.message);
      return;
    }
  };

  useConversion()
    .then((res) => res)
    .catch((err) => console.error(err));

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
        onChange={(e) => setOrderAsPDF(e.target.files[0])}
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
