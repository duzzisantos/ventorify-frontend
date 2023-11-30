module.exports = (app) => {
  const backup = require("../controllers/backupWarehouse.controllers");
  const express = require("express");
  var router = express.Router();

  router.post("/initiate-backup", backup.create);
  router.get("/display-backup", backup.findAll);
  app.use("/api/backup", router);
};
