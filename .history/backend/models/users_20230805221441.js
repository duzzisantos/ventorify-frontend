const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Users = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  passwordHint: {
    question: String,
    answer: String,
  },
});
