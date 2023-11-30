const mongoose = require("mongoose");
const Backup = mongoose.Schema(
  {
    officerName: String,
    category: String,
    product: String,
    batchNumber: Number,
    batchAmount: Number,
    economicOQ: Number,
    price: Number,
    soldUnits: [mongoose.Schema.Types.Mixed],
    productImage: String,
    firstEntryDate: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("backup", Backup);
