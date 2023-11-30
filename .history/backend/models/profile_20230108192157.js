const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Profile = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: String,
    role: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
    userName: String,
    passWord: String,
    settings: {
      theme: {
        type: String,
        default: "", //enter default CSS theme settings here as string
      },
      nightMode: {
        type: Boolean,
        default: false, // when true, frontend logic for automatic night mode is activated, else nothing happens
      },
      fontSize: {
        type: String,
        default: "", // enter default CSS font size settings here
      },
      wantsNotification: {
        type: Boolean,
        default: false, // when true, the frontend logic for push notification is activated, else nothing happens
      },
    },
    sentBox: [],
    inbox: [],
    activities: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("profile", Profile);
