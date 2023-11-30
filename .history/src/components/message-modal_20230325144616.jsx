import React from "react";
import { Modal, FormControl, Button, FormLabel, Form } from "react-bootstrap";
import { CheckCircleFill, EnvelopeOpenFill } from "react-bootstrap-icons";

const MessageModal = ({
  element,
  handleClose,
  show,
  handleReply,
  onChange,
  text,
  setText,
}) => {
  return (
    <Modal>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="lg"
        backdrop="static"
        keyboard="false"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <EnvelopeOpenFill /> {show ? element.subject : null}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormLabel htmlFor="receiver">
              <strong>
                To: {show ? element.sender : null}{" "}
                <CheckCircleFill
                  className="text-success"
                  title={`${element.sender} is verified`}
                />
              </strong>
            </FormLabel>
            <FormControl type="text" id="receiver" value={element.sender} />
            <FormLabel htmlFor="subject">Subject</FormLabel>
            <FormControl
              type="text"
              id="subject"
              value={"RE: " + element.subject}
            />
            <FormLabel htmlFor="body">Message</FormLabel>
            <textarea id="body" value={text} onChange={onChange} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="transparent"
            className="border border-1 border-secondary"
            onClick={handleClose}
            title="Close message"
          >
            Close
          </Button>
          <Button
            variant="success"
            type="submit"
            onSubmit={handleReply}
            title="Reply message"
          >
            Reply
          </Button>
        </Modal.Footer>
      </Modal>
    </Modal>
  );
};

export default MessageModal;
