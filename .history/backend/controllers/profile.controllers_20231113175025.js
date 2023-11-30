const Profile = require("../models/profile");
const bcrypt = require("bcryptjs");
exports.create = (req, res) => {
  if (!req.body) {
    console.log("Request body cannot be empty!");
  }

  const profile = new Profile({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });

  const salt = bcrypt.genSalt(12);
  profile.passWord = bcrypt.hash(req.body.passWord, salt);

  profile
    .save(profile)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error.request);
    });
};

exports.findOne = async (req, res) => {
  const body = req.body;
  const client = await Profile.findOne({
    userName: body.userName,
    passWord: body.passWord,
  });

  if (client) {
    const isRegisteredClient = bcrypt.compare(body.passWord, client.passWord);
    if (isRegisteredClient) {
      console.log(res.status(200));
      console.log("Ok! Successful login");
      res.end();
    } else {
      console.log(res.status(403));
      console.log(
        "Forbidden request! Either username or password is incorrect."
      );
    }
  }
};

// If the user wants to edit their profile settings, we can allow them change only the settings object
// from preset properties to their unique preferences which will be coded on the frontend.
