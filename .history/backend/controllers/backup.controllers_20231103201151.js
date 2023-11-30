const Backup = require("../models/backup");
const WareHouse = require("../models/aggregate-model");
exports.find = async (req, res) => {
  try {
    const warehouseData = await WareHouse.find();
    const backupData = warehouseData.map((data) => ({
      product: data.product,
      totalProductCount: data.totalProductCount,
      category: data.category,
      economicOrderQuantity: data.economicOrderQuantity,
      unitPrice: data.unitPrice,
    }));

    await Backup.insertMany(backupData);
    res.send("Backup successful");
  } catch (err) {
    console.log(err.message);
  }
};
