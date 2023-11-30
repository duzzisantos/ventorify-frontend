import { CheckCircle } from "react-bootstrap-icons";
import PropTypes from "prop-types";
import { customDateFormat, preferredLanguage } from "../utils/helpers";

const FollowUpMessages = ({ emailhasReply, id, data }) => {
  return (
    <>
      {emailhasReply && (
        <div className="col-md-10 col-10 p-3 mt-3 mb-3 border-end border-secondary border-5 shadow-lg">
          <small className="fw-bold">Follow up message</small>
          {data
            .filter(
              (element) =>
                element._id === id &&
                Object.values(element?.reply).length &&
                element?.reply?.replyBody !== ""
            )
            .map((item, index) => (
              <div key={index} className="mt-3 d-flex flex-column hstack gap-3">
                <p className="lh-sm">{item.reply.replyBody}</p>
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
