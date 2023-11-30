const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AggregateShelfItems = new Schema(
  {
    product: String,
    totalProductCount: Number,
    category: String,
    economicOrderQuantity: Number,
    // salesOperations: {
    //   quantitySold: Number,
    //   revenue: Number,
    //   customerId: String,
    //   customerName: String,
    //   customerPhone: String,
    //   customerAddress: String,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("aggregate-shelf", AggregateShelfItems);
