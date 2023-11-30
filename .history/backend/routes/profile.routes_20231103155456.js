module.exports = (app) => {
  const profile = require("../controllers/profile.controllers");
  const router = require("express").Router();

  router.post("/auth-signup", profile.Signup);
  app.use("/auth-signup", router);
};
