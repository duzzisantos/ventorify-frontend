import { Operate } from "../utils/inventory-methods";
const Shelf = require("../models/shelf");
const WareHouse = require("../models/warehouse");

exports.find = async (req, res) => {
  try {
    const warehouseData = await WareHouse.find();
    const shelfData = await Shelf.find();
    const method = new Operate(warehouseData, shelfData);
    const id = req.params.id;
    const foundData = method.fromShelfToStore(id);
    console.log(foundData);
    return foundData;
  } catch (err) {
    console.log(err.message);
  }
};

exports.deleteAll = (req, res) => {
  Shelf.deleteMany({})
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
