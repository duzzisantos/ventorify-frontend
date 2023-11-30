import { CheckCircle } from "react-bootstrap-icons";
import PropTypes from "prop-types";
import { customDateFormat, preferredLanguage } from "../utils/helpers";

const FollowUpMessages = ({ emailhasReply, id, data }) => {
  return (
    <>
      {emailhasReply && (
        <div className="col-md-10 col-10 p-3 mt-5 mb-3 border-end border-secondary border-5 shadow-sm">
          <small className="fw-bold">Follow up message</small>
          {data
            .filter(
              (element) =>
                element._id === id &&
                Object.values(element?.reply).length &&
                element?.reply?.replyBody !== ""
            )
            .map((item, index) => (
              <div key={index} className="justify-content-start">
                <p className="mt-3">{item.reply.replyBody}</p>
                <small>
                  Received:{" "}
                  {customDateFormat(
                    item.reply.received,
                    preferredLanguage,
                    "UTC"
                  )}{" "}
                  <CheckCircle />
                </small>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

FollowUpMessages.propTypes = {
  emailhasReply: PropTypes.bool,
  id: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
};

export default FollowUpMessages;
