const User = require("../models/profile");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcryptjs");

//This handles signing up
module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const isExistingUser = await User.findOne({ email });

    if (isExistingUser) {
      return res.json({ message: "User already exists" });
    }

    const user = await User.create({ email, password, username });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed up successfully", success: true, user });
    next();
  } catch (err) {
    console.error(err);
  }
};

//This handles login

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      //Do not explicitly tell the user that their email is incorrect
      //Instead:
      return res.json({ message: "Either email or password is incorrect" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      //Do not explicitly tell the user that their password is incorrect
      //Instead:
      return res.json({ message: "Either email or password is incorrect" });
    }

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res
      .status(201)
      .json({ message: "User logged in successfully", succes: true });
    next();
  } catch (err) {
    console.error(err);
  }
};
