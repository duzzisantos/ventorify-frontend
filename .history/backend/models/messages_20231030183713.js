const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Messages = new Schema(
  {
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    subject: String,
    messageBody: String,
    sent: {
      type: Boolean,
      default: true,
    },
    firstTimeCall: {
      type: Date,
      default: null,
    },
    seen: {
      type: Boolean,
      default: false,
    },
    reply: {
      replyBody: String,
      received: {
        type: Date,
        default: null,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("messages", Messages);
