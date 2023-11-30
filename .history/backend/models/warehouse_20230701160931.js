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
    return Promise.resolve(null);
  }

  return axios
    .get(imageUrl, {
      responseType: "arraybuffer",
    })
    .then((response) => {
      const base64 = Buffer.from(response.data, "binary").toString("base64");
      return base64;
    })
    .catch((error) => {
      console.error("Error converting image URL to base64:", error);
      return null;
    });
});
module.exports = mongoose.model("warehouse", WareHouse);
