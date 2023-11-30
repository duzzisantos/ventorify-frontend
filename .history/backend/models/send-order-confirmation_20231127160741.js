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
    type: Buffer,
    required: true,
  },
  customerHasPaid: Boolean,
});

module.exports = mongoose.model("order-confirmation", OrderConfirmation);
