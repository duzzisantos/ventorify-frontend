module.exports = (app) => {
  var express = require("express");
  var router = express.Router();

  router.get("/", (req, res, next) => {
    res.render("login");
  });

  app.use("/login", router);
};
