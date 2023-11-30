const MainWarehouse = require("../models/warehouse");
const BackupWarehouse = require("../models/backup-warehouse");

module.exports = (app) => {
  const express = require("express");
  const router = express.Router();

  router.post("/", async (req, res) => {
    try {
      const originalData = await MainWarehouse.find();
      await BackupWarehouse.insertMany(originalData);
      res.status(200).json({ message: "Backup completed successfully" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Internal server error occured in warehouse backup" });
    }
  });
  app.use("/api/backup-original-warehouse", router);
};
