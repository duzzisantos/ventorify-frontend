import { useState, useEffect } from "react";
import axios from "axios";

const FollowUpMessages = ({ emailHasReply, id, data }) => {
  return (
    <div className="col-md-8 col-10 p-3 mt-3 mb-3 border-end border-secondary">
      {data
        .filter(
          (element) =>
            element._id === id &&
            Object.values(element.reply).length &&
            element.reply.replyBody !== ""
        )
        .map((item) => (
          <p className="lh-sm">{item.reply.replyBody}</p>
        ))}
    </div>
  );
};
