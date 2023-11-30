const MainWarehouse = require("../models/warehouse");
const BackupWarehouse = require("../models/backup-warehouse");

//cause data backup to save in designated collection based on similar data models

exports.create = async (req, res) => {
  try {
    const originalData = await MainWarehouse.find();

    // Exclude the _id field to generate new unique _id values
    const dataToBackup = originalData.map((data) => {
      const { _id, ...rest } = data; //we are returning everything except the object id
      return rest;
    });

    // Insert the data into the BackupWarehouse collection
    await BackupWarehouse.insertMany(dataToBackup);

    res.status(200).json({ message: "Backup completed successfully" });
  } catch (err) {
    console.error(err);
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
