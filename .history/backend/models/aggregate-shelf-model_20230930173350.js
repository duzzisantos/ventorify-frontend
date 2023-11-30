const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AggregateShelfItems = new Schema({
  product: String,
  totalProductCount: Number,
  category: String,
  economicOrderQuantity: Number,
});

module.exports = mongoose.model("aggregate-shelf", AggregateShelfItems);
