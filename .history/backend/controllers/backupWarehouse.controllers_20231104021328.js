const MainWarehouse = require("../models/warehouse");
const BackupWarehouse = require("../models/backup-warehouse");

//cause data backup to save in designated collection based on similar data models

exports.create = async (req, res) => {
  MainWarehouse.post("save", async function (doc) {
    // Copy the newly saved data to the BackupWarehouse collection
    await BackupWarehouse.updateOne({ _id: doc._id }, doc, { upsert: true });
  });
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
