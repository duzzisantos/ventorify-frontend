const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const axios = require("axios");
const WareHouse = new Schema(
  {
    officerName: String,
    category: String,
    product: String,
    batchNumber: Number,
    batchAmount: Number,
    economicOQ: Number,
    price: Number,
    productImage: String,
    firstEntryDate: String,
  },
  { timestamps: true }
);

WareHouse.virtual("base64").get(function () {
  const imageURL = this.productImage;

  if (!imageURL) {
    return null;
  }

  const response = axios.get(imageURL, {
    responseType: "arraybuffer",
  });

  const base64 = Buffer.from(response.data, "binary").toString("base64");
  return base64;
});
module.exports = mongoose.model("warehouse", WareHouse);
