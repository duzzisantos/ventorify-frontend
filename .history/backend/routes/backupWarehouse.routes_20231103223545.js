const backupWarehouse = require("../models/backup-warehouse");

module.exports = (app) => {
  const express = require("express");
  const router = express.Router();

  router.post("/");
  app.use("/api/backup-original-warehouse", router);
};
