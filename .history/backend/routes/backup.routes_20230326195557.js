module.exports = (app) => {
  const backup = require("../controllers/backup.controllers");
  var express = require("express");
  var router = express.Router();

  router.get("/", backup.find);
  app.use("/api/backup", router);
};
