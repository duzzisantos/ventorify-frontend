module.exports = (app) => {
  const profile = require("../controllers/profile.controllers");
  var router = require("express").Router();

  router.post("/", profile.Signup);
  app.use("/auth-signup", router);
};
