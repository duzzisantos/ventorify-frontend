module.exports = (app) => {
  const backup = require("../controllers/backupWarehouse.controllers");
  const express = require("express");
  var router = express.Router();

  router.post("/", backup.create);
  router.get("/", backup.findAll);
  app.use("/api/backup-warehouse", router);
};
