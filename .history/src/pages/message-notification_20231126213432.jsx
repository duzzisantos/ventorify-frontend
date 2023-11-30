import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import MessageToggler from "../components/message-toggler";
import { Button } from "bootstrap";
import { customDateFormat } from "../utils/helpers";

const Notifications = ({ ref, notificationClass }) => {
  const [message, setMessage] = useState([]);

  const handleSeenMessage = async (_id) => {
    const isSeen = {
      seen: true,
    };
    try {
      const res = await axios.put(
        `http://localhost:4000/api/messages/${_id}`,
        isSeen
      );
      console.log(res.status);
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleDisplayMessages = () => {
    axios
      .get(`http://localhost:4000/api/messages`)
      .then((res) => {
        setMessage(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleDeleteMessage = (_id) => {
    axios
      .delete(`http://localhost:4000/api/messages/${_id}`)
      .then((res) => {
        console.log(res.status);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    handleDisplayMessages();
  }, []);

  return (
    <Container className="col-md-10 text-secondary">
      <div className="my-5 text-start mx-3">
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

          <Table hover responsive borderless>
            <thead>
              <tr className="text-start">
                <th>Sender</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {message.map((item) => {
                const { _id, seen, sender, messageBody, createdAt, subject } =
                  item;
                return (
                  <tr
                    key={_id}
                    className={`text-start ${seen ? "" : "bg-success-subtle"}`}
                  >
                    <td>{sender}</td>
                    <td>{subject}</td>
                    <td>{customDateFormat(createdAt, "en")}</td>
                    <td>Delete</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
};

export default Notifications;
