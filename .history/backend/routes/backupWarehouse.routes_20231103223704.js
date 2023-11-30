const {
  triggerBackup,
  findAllBackedupData,
} = require("../models/backup-warehouse");

module.exports = (app) => {
  const express = require("express");
  const router = express.Router();

  router.post("/", triggerBackup);
  router.get("/", findAllBackedupData);
  app.use("/api/backup-original-warehouse", router);
};
