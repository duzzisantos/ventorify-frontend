module.exports = (app) => {
  const { userVerification } = require("../middleware/authMiddleWare");
  const profile = require("../controllers/profile.controllers");
  var router = require("express").Router();

  router.post("/", profile.Signup);
  router.post("/login", profile.Login);
  router.post("/", userVerification);
  app.use("/api/signup", router);
};
