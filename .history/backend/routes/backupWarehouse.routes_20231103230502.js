const backup = require("../controllers/backupWarehouse.controllers");

module.exports = (app) => {
  const express = require("express");
  const router = express.Router();

  router.post("/", backup.triggerBackup);
  router.get("/", backup.findAllBackedUpData);
  app.use("/api/backup-original-warehouse", router);
};
