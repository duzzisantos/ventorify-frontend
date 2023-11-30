import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

import axios from "axios";
const ReplyMessage = ({
  id,
  recipient,
  subject,
  sender,
  data,
  setData,
  recipientPlaceholder,
  senderPlaceHolder,
  replyBody,
  show,
  setShow,
}) => {
  const [reply, setReply] = useState("");
  //Handle submitting reply
  const handleSubmitReply = (id, e) => {
    e.preventDefault();
    const replyMessageObject = {
      ...data,
      reply: {
        replyBody: reply,
        received: new Date(Date.now()).toISOString(),
      },
    };
    axios
      .put(`http://localhost:4000/api/messages/${id}`, replyMessageObject)
      .then((res) => {
        if (res.status === "OK") {
          setData(res.data);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
  //Original sender becomes recipient and vice versa to avoid confusing anyone reading this code
  return (
    <Modal show={show} onHide={setShow} backdrop="static" size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-secondary">
          Subject: Re: {subject}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="py-3 px-3">
          <label>
            <b>Message ID:</b> {id}
          </label>
          <form>
            <label htmlFor="Sender">
              <b>Sender:</b> {recipientPlaceholder}
            </label>
            <input
              type="text"
              id="Sender"
              name="Sender"
              defaultValue={recipient}
              className="form-control"
            />
            <label htmlFor="Recipient">
              <b>Recipient:</b> {senderPlaceHolder}
            </label>
            <input
              type="text"
              id="Recipient"
              name="Recipient"
              defaultValue={sender}
              className="form-control w-100"
            />
            <hr />
            <textarea
              rows={"10"}
              name="ReplyMessage"
              id="ReplyMessage"
              value={replyBody}
              className="p-2 form-control form-text w-100"
              placeholder="Type message"
              onChange={(e) => setReply(e.target.value)}
            />
            <div className="hstack gap-2 mt-2">
              <Button variant="secondary" onClick={setShow}>
                Cancel
              </Button>
              <Button
                variant="success"
                type="submit"
                onClick={(id) => handleSubmitReply(id)}
              >
                Follow up
              </Button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ReplyMessage;
