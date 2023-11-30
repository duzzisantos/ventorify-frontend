module.exports = (app) => {
  const profile = require("../controllers/profile.controllers");
  var router = require("express").Router();

  router.post("/", profile.create);
  router.get("/userName", profile.findOne);
  app.use("/auth", router);
};
