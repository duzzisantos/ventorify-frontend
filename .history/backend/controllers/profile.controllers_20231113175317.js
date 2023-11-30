const Profile = require("../models/profile");
const bcrypt = require("bcryptjs");
const passport = require("passport-local");
exports.toSignup = (req, res) => {
  if (!req.body) {
    console.log("Request body cannot be empty!");
  }

  const profile = new Profile({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });

  const salt = bcrypt.genSalt(12);
  profile.password = bcrypt.hash(req.body.password, salt);

  profile
    .save(profile)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error.request);
    });
};

exports.toLogin = async (req, res) => {};

// If the user wants to edit their profile settings, we can allow them change only the settings object
// from preset properties to their unique preferences which will be coded on the frontend.
