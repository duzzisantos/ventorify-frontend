const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AggregateProducts = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product: String,
  totalProductCount: Number,
  category: String,
  economicOrderQuantity: Number,
});

module.exports = mongoose.model("aggregate-products", AggregateProducts);
