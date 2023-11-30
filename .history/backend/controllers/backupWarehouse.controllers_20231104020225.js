const MainWarehouse = require("../models/warehouse");
const BackupWarehouse = require("../models/backup-warehouse");

//cause data backup to save in designated collection based on similar data models

exports.create = async (req, res) => {
  try {
    // Check if there is any data in BackupWarehouse
    const isBackupEmpty = (await BackupWarehouse.countDocuments()) === 0;

    if (isBackupEmpty) {
      // Retrieve all data from MainWarehouse
      const allData = await MainWarehouse.find();

      if (allData.length > 0) {
        // Copy all data from MainWarehouse to BackupWarehouse
        await BackupWarehouse.insertMany(allData);
      }
    }

    // Retrieve the latest data from MainWarehouse
    const latestData = await MainWarehouse.findOne(
      {},
      {},
      { sort: { updatedAt: -1 } }
    );

    if (latestData) {
      // Update the corresponding document in BackupWarehouse
      await BackupWarehouse.updateOne(
        { _id: latestData._id },
        { $set: latestData }
      );
    }

    res
      .status(200)
      .json({ message: "Data copy and update completed successfully" });
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .json({
        message: "Internal server error occurred during data copy and update",
      });
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

exports.deleteMany = async (req, res) => {
  BackupWarehouse.deleteMany({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error in deleting all backed up data",
      });
    });
};
