import { Modal, Button, Form } from "react-bootstrap";

const PaymentModal = ({
  _id,
  customerName,
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
        <Modal.Title>
          Payment for order #{_id}
          {customerName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label htmlFor="sanctioned-by">
            Payment Sanctioned By:
          </Form.Label>
          <Form.Control
            id="sanctioned-by"
            name={paymentSanctionedBy}
            value={paymentSanctionedBy}
            onChange={(e) => setSanctionedBy(e.target.value)}
          />
          <Button variant="primary" onClick={handleConfirmation}>
            Understood
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
