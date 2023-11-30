const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderConfirmation = new Schema(
  {
    customerId: {
      type: String,
      required: true,
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
    revenue: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("order-confirmation", OrderConfirmation);
