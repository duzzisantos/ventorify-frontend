const ShelfSchema = require("../models/shelf");
const WareHouseSchema = require("../models/warehouse");

//redundant code, investigate the use.
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

// exports.findAll = (req, res) => {
//   const shelf = new ShelfSchema();
//   let result = WareHouseSchema.find({});
//   result.forEach((item) => {
//     shelf.save(item);
//     console.log(shelf);
//   });
// };

exports.fromWarehouseToShelf = (req, res) => {
  const id = req.params.id;
  const doc = WareHouseSchema.findOneAndUpdate(id);
  doc.set("isInShelf", true);
  doc.save((err) => {
    err ? res.status(404) : res.status(200);
  });
};
