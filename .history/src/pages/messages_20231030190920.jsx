import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import {
  Envelope,
  PersonCircle,
  PencilFill,
  SendFill,
} from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import axios from "axios";

const Messages = () => {
  const [send, setSend] = useState({
    sender: "",
    recipient: "",
    subject: "",
    messageBody: "",
  });

  const handleSubmit = () => {
    axios
      .post("http://localhost:4000/api/messages", send)
      .then((res) => {
        setSend(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container className="col-md-10 text-secondary">
      <div className="my-5 text-start mx-3">
        <h1 className="fw-bold">Send messages</h1>
        <p>Exchange messages with external stakeholders</p>
      </div>
      <hr />
      <div className="my-4 mx-3 col-md-6 text-start">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="emailSender" className="form-label">
              <PersonCircle /> From
            </label>
            <input
              type="text"
              className="form-control"
              id="emailSender"
              aria-describedby="emailSender"
              value={send.sender}
              onChange={(e) => setSend({ ...send, sender: e.target.value })}
            />
            <hr />
            <label htmlFor="emailRecipient" className="form-label">
              <PersonCircle /> Recipient
              <span className="text-secondary mx-3">eg: john.doe@mail.com</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="emailRecipient"
              aria-describedby="emailRecipient"
              value={send.recipient}
              onChange={(e) => setSend({ ...send, recipient: e.target.value })}
            />
            <hr />

            <label htmlFor="emailSubject" className="form-label">
              <PencilFill /> Subject
              <span className="text-secondary mx-3">
                eg: Request to deliver items
              </span>
            </label>
            <input
              type="text"
              className="form-control"
              id="emailSubject"
              aria-describedby="emailSubject"
              value={send.subject}
              onChange={(e) => setSend({ ...send, subject: e.target.value })}
            />
            <hr />
            <label htmlFor="emailBody" className="form-label">
              <Envelope /> Message
              <span className=" mx-3">N.B: Do not leave empty</span>
            </label>
            <textarea
              type="text"
              className="form-control"
              id="emailBody"
              aria-describedby="emailBody"
              value={send.messageBody}
              onChange={(e) =>
                setSend({ ...send, messageBody: e.target.value })
              }
            />
            <Button className="btn btn-success mt-3 mb-3" type="submit">
              Send <SendFill />{" "}
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Messages;
