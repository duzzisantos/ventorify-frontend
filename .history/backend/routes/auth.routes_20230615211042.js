module.exports = () => {
  var express = require("express");
  var router = express.Router();

  router.get("/", (req, res, next) => {
    res.render("login");
  });

  module.exports = router;
};
