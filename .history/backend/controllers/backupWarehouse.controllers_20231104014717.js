const MainWarehouse = require("../models/warehouse");
const BackupWarehouse = require("../models/backup-warehouse");

//cause data backup to save in designated collection based on similar data models

exports.create = async (req, res) => {
  try {
    // Aggregate the newest data from MainWarehouse
    const aggregationPipeline = [
      {
        $sort: { createdAt: -1 }, // Sort by createdAt field in descending order
      },
      {
        $group: {
          _id: "id", // Replace with a unique identifier field if needed
          data: { $first: "$$ROOT" }, // Get the newest document for each unique identifier
        },
      },
      {
        $replaceRoot: { newRoot: "$data" }, // Replace the root document with the newest document
      },
    ];

    const newestData = await MainWarehouse.aggregate(aggregationPipeline);

    if (newestData.length > 0) {
      // Insert or update the newest data in BackupWarehouse
      const bulkOps = newestData.map((data) => ({
        updateOne: {
          filter: { _id: data._id },
          update: { $set: data },
          upsert: true, // Insert if not found
        },
      }));

      await BackupWarehouse.bulkWrite(bulkOps);
      res.status(200).json({ message: "Backup completed successfully" });
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
