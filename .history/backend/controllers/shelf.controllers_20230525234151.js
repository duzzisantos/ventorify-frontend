const ShelfSchema = require("../models/shelf");
const WareHouse = require("../models/warehouse");
const method = require("../utils/inventory-methods");
//redundant code, investigate the use.

exports.find = async (req, res) => {
  try {
    const warehouseData = await WareHouse.find();
    const transferSingleItemToShelf = warehouseData.find((element) => {});
  } catch (err) {
    console.log(err.message);
  }
};
exports.deleteAll = (req, res) => {
  ShelfSchema.deleteMany({})
    .then((data) => {
      res.status(200).json({
        message: "Successfully deleted collection",
      });
      console.log(data, "All these data have been wiped from the collection");
    })
    .catch((err) => {
      console.log(err);
    });
};
