import React from "react";
import {
  Modal,
  FormControl,
  Button,
  FormLabel,
  FormText,
} from "react-bootstrap";
import {
  CheckCircle,
  CheckCircleFill,
  EnvelopeOpenFill,
} from "react-bootstrap-icons";
const MessageModal = ({ element, handleClose, show, handleReply }) => {
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
          <FormText />
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
          <Button variant="success" onClick={handleReply} title="Reply message">
            Reply
          </Button>
        </Modal.Footer>
      </Modal>
    </Modal>
  );
};
