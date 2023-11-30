const MainWarehouse = require("../models/warehouse");
const BackupWarehouse = require("../models/backup-warehouse");

//cause data backup to save in designated collection based on similar data models
exports.triggerBackup = async (req, res) => {
  try {
    const originalData = await MainWarehouse.find();
    await BackupWarehouse.insertMany(originalData);
    res.status(200).json({ message: "Backup completed successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error occured in warehouse backup" });
  }
};

//consume this for referencing original warehouse entry before aggregation of goods has occured
exports.findAllBackedUpData = (req, res) => {
  const id = req.query.id;
  var condition = id ? { $regex: new RegExp(id), $options: "gi" } : {};
  BackupWarehouse.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
};
