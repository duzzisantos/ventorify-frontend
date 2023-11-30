require("dotenv").config();
console.log(process.env.MONGO_URI);
console.log(process.env.MONGO_URI);
module.exports = {
  url: process.env.MONGO_URI,
};
