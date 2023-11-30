import React, { useState } from "react";
import { preferredLanguage, customDateFormat } from "../utils/helpers";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Trash2 } from "react-bootstrap-icons";
const MessageToggler = ({
  element,
  isRead,
  handleSeenMessage,
  handleDeleteMessage,
}) => {
  const [hover, setHover] = useState(false);

  return (
    <>
      <div
        className={`${
          isRead ? "bg-transparent" : "bg-warning"
        } border-0 rounded-0 ${hover ? "text-success" : "text-secondary"}`}
        key={element._id}
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={handleSeenMessage}
      >
        <Col
          className={`d-flex flex-row hstack gap-3 ${
            hover ? "text-success" : "text-secondary"
          }  py-2 border-bottom`}
        >
          <span>
            <p
              style={{ height: "50px", width: "50px" }}
              className="bg-success text-light text-center justify-content-center mx-2 d-flex flex-row mb-0 align-items-center rounded-5"
            >
              {element.sender.slice(0, 2).toUpperCase()}
            </p>
          </span>
          <span className=" text-start col-sm-2 mt-2 mx-3">
            {element.sender}
          </span>
          <Link
            className="text-start text-secondary mt-2 mx-3"
            to={`/navbar/message-notification/email-details/${element._id}`}
          >
            {element.subject}
          </Link>
          <span className="ms-auto mt-2 me-2">
            {customDateFormat(element.createdAt, preferredLanguage, "UTC")}
          </span>
          <button
            className="mt-2 btn-sm btn bg-transparent text-dark"
            title="Click to delete"
            onClick={handleDeleteMessage}
          >
            <Trash2 />
          </button>
        </Col>
      </div>
    </>
  );
};

export default MessageToggler;
