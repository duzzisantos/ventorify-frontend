module.exports = () => {
  const backup = require("../controllers/backup.controllers");
  var express = require("express");
  var router = express.Router();

  router.get("/api/backup", backup.find);
};
