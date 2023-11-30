module.exports = (app) => {
  const backup = require("../controllers/backupWarehouse.controllers");
  const express = require("express");
  var router = express.Router();

  router.post("/", backup.triggerBackup);
  router.get("/", backup.findAllBackedUpData);
  app.use("/api/backup-warehouse", router);
};
