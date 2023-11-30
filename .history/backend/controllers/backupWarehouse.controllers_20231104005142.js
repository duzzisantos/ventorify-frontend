const MainWarehouse = require("../models/warehouse");
const BackupWarehouse = require("../models/backup-warehouse");

//cause data backup to save in designated collection based on similar data models
exports.create = async (req, res) => {
  try {
    const mostRecentEntryId = req.params.id;
    // Find the most recent document in MainWarehouse
    const mostRecentEntry = await MainWarehouse.findById(mostRecentEntryId);

    if (mostRecentEntry) {
      // Insert the most recent entry into BackupWarehouse
      await BackupWarehouse.create(mostRecentEntry);

      res.status(200).json({
        message: "Backup of the most recent entry completed successfully",
      });
    } else {
      res.status(404).json({ message: "No data found in MainWarehouse" });
    }
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .json({ message: "Internal server error occurred in warehouse backup" });
  }
};

//consume this for referencing original warehouse entry before aggregation of goods has occured
//useful for tracking anything operations or performance related
//especially if there are defects or we want to track what happened at the warehouse originally
//before goods were aggregated and transferred to the shelf
exports.findAll = async (req, res) => {
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
