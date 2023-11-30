const Backup = require("../models/backup");
const WareHouse = require("../models/aggregate-model");
exports.find = async (req, res) => {
  try {
    const warehouseData = await WareHouse.find();
    const backupData = warehouseData.map((data) => ({
      soldUnits: data.soldUnits,
      officerName: data.officerName,
      category: data.category,
      firstEntryDate: data.firstEntryDate,
      batchNumber: data.batchNumber,
      batchAmount: data.batchAmount,
      economicOQ: data.economicOQ,
      productImage: data.productImage,
      product: data.product,
      price: data.price,
    }));

    await Backup.insertMany(backupData);
    res.send("Backup successful");
  } catch (err) {
    console.log(err.message);
  }
};
