module.exports = (app) => {
  const profile = require("../controllers/AuthController");
  var router = require("express").Router();

  router.post("/", profile.create);
  router.get("/userName", profile.findOne);
  app.use("/auth", router);
};
