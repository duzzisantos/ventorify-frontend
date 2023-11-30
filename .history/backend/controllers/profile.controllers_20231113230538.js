const Profile = require("../models/profile");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

//Signup to the database and store passowrd encrypted
const toSignup = async (req, res) => {
  if (!req.body) {
    console.log("Request body cannot be empty!");
  }

  const profile = new Profile({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });

  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    profile.password = hashedPassword;
    const data = await profile.save();

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Login by finding username which matches and compare decrypted password
const findByUsername = async (username) => {
  try {
    return Profile.findOne({ username: username });
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await findByUsername(username);

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
          return done(null, false, {
            message: "Incorrect password or username",
          });
        }
      });
    } catch (err) {
      return done(err);
    }
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
