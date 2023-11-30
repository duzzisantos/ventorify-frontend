module.exports = (app) => {
  const backup = require("../controllers/backupWarehouse.controllers");
  const express = require("express");
  var router = express.Router();

  router.post("/initiate", backup.create);
  router.get("/display", backup.findAll);
  app.use("/api/backup", router);
};
