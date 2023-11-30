import { Modal, Button } from "react-bootstrap";

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
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        I will not close if you click outside me. Don not even try to press
        escape key.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleConfirmation}>
          Understood
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
