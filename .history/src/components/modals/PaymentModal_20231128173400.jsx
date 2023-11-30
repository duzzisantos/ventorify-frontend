import { Modal, Button, Form } from "react-bootstrap";

const PaymentModal = ({
  _id,
  show,
  handleClose,
  handleConfirmation,
  paymentSanctionedBy,
  paymentConfirmationId,
  setPaymentId,
  setSanctionedBy,
}) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Payment for Order #{_id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label htmlFor="sanctioned-by">
            Payment Sanctioned By:
          </Form.Label>
          <Form.Control
            type="text"
            id="sanctioned-by"
            name={paymentSanctionedBy}
            value={paymentSanctionedBy}
            onChange={(e) => setSanctionedBy(e.target.value)}
          />

          <Form.Label htmlFor="payment-id">Payment Confirmation ID:</Form.Label>
          <Form.Control
            type="text"
            id="payment-id"
            name={paymentConfirmationId}
            value={paymentConfirmationId}
            onChange={(e) => setPaymentId(e.target.value)}
          />
          <Button variant="success" size="sm" onClick={handleConfirmation}>
            Understood
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PaymentModal;
