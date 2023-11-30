const {
  triggerBackup,
  findAllBackedupData,
} = require("../models/backup-warehouse");

module.exports = (app) => {
  const express = require("express");
  const router = express.Router();

  router.post("/", ba);
  app.use("/api/backup-original-warehouse", router);
};
