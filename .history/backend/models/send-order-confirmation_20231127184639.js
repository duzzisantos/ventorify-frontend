const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderConfirmation = new Schema({
  customerId: {
    type: String,
    required: true,
    unique: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerOrderAsPDF: {
    type: String,
    required: true,
  },
  customerHasPaid: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("order-confirmation", OrderConfirmation);
