const {
  triggerBackup,
  findAllBackedupData,
} = require("../controllers/backupWarehouse.controllers");

module.exports = (app) => {
  const express = require("express");
  const router = express.Router();

  router.post("/", triggerBackup);
  router.get("/", findAllBackedupData);
  app.use("/api/backup-original-warehouse", router);
};
