import { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const PaymentModal = ({
  _id,
  element,
  show,
  handleClose,
  handleConfirmation,
  paymentSanctionedBy,
  paymentConfirmationId,
  setPaymentId,
  setSanctionedBy,
  user,
}) => {
  useEffect(() => {
    const filteredCustomer = element.filter((el) => _id.includes(el._id));
    setPaymentId(filteredCustomer[0]?.paymentConfirmationId);
    setSanctionedBy(filteredCustomer[0]?.paymentSanctionedBy);
  }, [_id, element, setPaymentId, setSanctionedBy]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      backdrop="static"
      keyboard={false}
    >
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
            name={"paymentSanctionedBy"}
            value={paymentSanctionedBy}
            onChange={(e) => setSanctionedBy(e.target.value)}
          />

          <Form.Label htmlFor="payment-id">Payment Confirmation ID:</Form.Label>
          <Form.Control
            type="text"
            id="payment-id"
            name={"paymentConfirmationId"}
            value={paymentConfirmationId}
            onChange={(e) => setPaymentId(e.target.value)}
          />
          <Button
            variant="success"
            size="sm"
            className="my-3"
            onClick={handleConfirmation}
          >
            Confirm Payment
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PaymentModal;
