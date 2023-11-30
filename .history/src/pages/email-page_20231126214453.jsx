import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import ReplyMessage from "../components/ReplyMessage";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CheckCircleFill,
  EnvelopeOpenFill,
  CheckCircle,
  ArrowLeft,
} from "react-bootstrap-icons";
import { customDateFormat, preferredLanguage } from "../utils/helpers";
import FollowUpMessages from "../components/FollowUpMessages";
const EmailPage = () => {
  //These cater for obtaining request parameters and navigation mechanism with which data can be passed between two routes
  const { id } = useParams();
  let navigate = useNavigate();

  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/messages/?_id=${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        if (err) {
          console.log(err.message);
          console.log("Promise failed");
        }
      });
  }, [id]);

  //Handle go back to inbox
  const handleGoBack = () => {
    navigate(`/message-notification`);
  };

  const emailhasReply = data.some(
    (element) => element._id === id && element.reply.replyBody
  );
  return (
    <Container className="text-start text-secondary py-5 px-1 vh-100">
      {data
        .filter((item) => (item._id === id ? item : !item))
        .map((data, index) => (
          <div key={index}>
            <h4 className="my-2">
              <EnvelopeOpenFill /> {data.subject}
            </h4>
            <hr />
            <div className={`${show ? "d-none" : "d-block"}`}>
              <div className="d-flex flex-column text-start">
                <small>
                  <b>Sender:</b> {data.sender}{" "}
                  <CheckCircleFill
                    className="text-success"
                    title={`${data.sender} is a verified user.`}
                  />
                </small>

                <small>
                  <b>Message ID:</b> {id}
                </small>
                <div className="shadow-sm py-3 px-3 mt-3 mb-3 border-end border-success border-5">
                  <p>{data.messageBody}</p>
                  <small>
                    Received:{" "}
                    {customDateFormat(data.createdAt, preferredLanguage, "UTC")}{" "}
                    <CheckCircle />
                  </small>
                </div>
              </div>
              <div className="hstack gap-2 mb-3">
                <Button
                  onClick={handleGoBack}
                  className="btn btn-secondary btn-sm"
                  title="Go back to message notifications page"
                  aria-label="Button for navigating back to message notifications"
                >
                  <ArrowLeft /> Go back
                </Button>
                <Button
                  className="btn btn-success btn-sm"
                  onClick={() => setShow(true)}
                >
                  Follow up
                </Button>
              </div>
            </div>
            {show && (
              <ReplyMessage
                id={id}
                recipient={data.sender}
                sender={data.recipient}
                subject={data.subject}
                show={show}
                setShow={setShow}
                setData={setData}
                data={data}
                recipientPlaceholder={data.sender}
                senderPlaceHolder={data.recipient}
              />
            )}
          </div>
        ))}
      <FollowUpMessages data={data} id={id} emailhasReply={emailhasReply} />
    </Container>
  );
};

export default EmailPage;
