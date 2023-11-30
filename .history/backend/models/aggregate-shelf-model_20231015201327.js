const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AggregateShelfItems = new Schema({
  product: String,
  totalProductCount: Number,
  category: String,
  economicOrderQuantity: Number,
  salesOperations: {
    quantitySold: Number,
    customerId: String,
    customerName: String,
    customerPhone: String,
    customerAddress: String,
  },
});

module.exports = mongoose.model("aggregate-shelf", AggregateShelfItems);
