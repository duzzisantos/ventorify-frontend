const Shelf = require("../models/shelf");
const WareHouse = require("../models/warehouse");

exports.transferItem = async (req, res) => {
  const itemID = req.params.id;
  try {
    const item = await WareHouse.findById(itemID);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
  } catch (err) {}
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
