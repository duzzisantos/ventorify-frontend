const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Shelf = new Schema({
  officerName: String,
  category: String,
  product: String,
  batchNumber: Number,
  batchAmount: Number,
  economicOQ: Number,
  productImage: String,
  entryDate: String,
});

module.exports = mongoose.model("shelf", Shelf);
