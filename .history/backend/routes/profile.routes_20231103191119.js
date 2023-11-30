const { userVerification } = require("../middleware/authMiddleWare");

module.exports = (app) => {
  const profile = require("../controllers/profile.controllers");
  var router = require("express").Router();

  router.post("/", profile.Signup);
  router.post("/login", profile.Login);
  router.post("/", userVerification);
  app.use("/api/signup", router);
};
