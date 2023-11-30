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

WareHouse.virtual("base64").get(async function () {
  const imageURL = this.productImage;

  if (!imageURL) {
    return Promise.resolve(null);
  }

  try {
    const response = await axios.get(imageURL, {
      responseType: "blob",
    });

    const blob = await response.data;
    return blob;
  } catch (error) {
    console.error("Error converting image URL to Blob:", error);
    return null;
  }
});
module.exports = mongoose.model("warehouse", WareHouse);
