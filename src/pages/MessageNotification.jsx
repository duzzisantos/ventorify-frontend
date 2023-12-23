import axios from "axios";
import { http } from "../api-calls/http";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import MessageToggler from "../components/MessageToggler";

const Notifications = ({ ref, notificationClass, accessToken }) => {
  const [message, setMessage] = useState([]);

  const { isLocal, isProduction, localhost, webhost } = http;
  const handleSeenMessage = async (_id) => {
    const isSeen = {
      seen: true,
    };
    try {
      const res = await axios.put(
        isLocal
          ? `${localhost}/api/messages/${_id}`
          : isProduction && `${webhost}/api/messages/${_id}`,
        isSeen,
        { headers: { Authorization: `Bearer${accessToken}` } }
      );
      console.log(res.status);
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleDisplayMessages = () => {
    axios
      .get(
        isLocal
          ? `${localhost}/api/messages`
          : isProduction && `${webhost}/api/messages`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      .then((res) => {
        setMessage(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleDeleteMessage = (_id) => {
    axios
      .delete(
        isLocal
          ? `${localhost}/api/messages/${_id}`
          : isProduction && `${webhost}/api/messages/${_id}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      .then((res) => {
        console.log(res.status);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    handleDisplayMessages();
  });

  return (
    <Container className="col-md-10 text-secondary">
      <div className="my-5 mb-0 text-start mx-3">
        <h1 className="fw-bold">Outbox</h1>
        <p>Read sent emails, follow up, and fulfill customer orders.</p>
      </div>
      <hr />

      <div className={notificationClass} ref={ref}>
        {" "}
        {/*div with ref: my-4 text-start bg-white col-md-12 shadow-sm d-flex flex-row nowrap */}
        <div
          className="d-flex flex-column col-md-12 px-3 py-3"
          id="notification-wrapper"
        >
          <div className="d-flex flex-row flex-nowrap fw-bold justify-content-between mx-4">
            <span>Sender</span>
            <span>Subject</span>
            <span>Date</span>
          </div>
          <hr className="border border-3 border-secondary" />
          {message
            .reverse()
            .map((item) =>
              item.sender && item.messageBody ? (
                <MessageToggler
                  key={item._id}
                  element={item}
                  isRead={item.seen}
                  handleSeenMessage={() => handleSeenMessage(item._id)}
                  handleDeleteMessage={() => handleDeleteMessage(item._id)}
                />
              ) : null
            )}
        </div>
      </div>
    </Container>
  );
};

export default Notifications;
