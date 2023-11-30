const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AggregateShelfItems = new Schema(
  {
    product: String,
    totalProductCount: {
      type: Number,
      required: true,
    },
    category: String,
    economicOrderQuantity: Number,
    unitPrice: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("aggregate-shelf", AggregateShelfItems);
