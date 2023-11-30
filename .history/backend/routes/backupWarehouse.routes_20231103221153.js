const express = require("express");
const router = express.Router();

const MainWarehouse = require("../models/warehouse");
const BackupWarehouse = require("../models/backup-warehouse");

router.post("/api/backup-original-warehouse", async (req, res) => {
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

module.exports = router;
