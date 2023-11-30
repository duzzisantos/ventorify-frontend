const Profile = require("../models/profile");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const toSignup = (req, res) => {
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

const findByUsername = (username) => {
  return Profile.findOne({ username: username });
};
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

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  const user = Profile.findOne({ _id: id });
  done(null, user);
});

//middlewrae to check if the user is authenticated
function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
}

module.exports = {
  passport,
  ensureAuth,
  toSignup,
};
