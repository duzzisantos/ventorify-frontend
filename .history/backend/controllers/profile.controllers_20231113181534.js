const Profile = require("../models/profile");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

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

exports.toLogin = async () => {
  const { findByUsername } = Profile;
  passport.use(
    new LocalStrategy(function (username, password, done) {
      const user = findByUsername(username);

      if (!user) {
        return done(null, false, {
          message: "Either username or password is incorrect",
        });
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return done(err);
        }

        if (result) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password" });
        }
      });
    })
  );
};

// If the user wants to edit their profile settings, we can allow them change only the settings object
// from preset properties to their unique preferences which will be coded on the frontend.
