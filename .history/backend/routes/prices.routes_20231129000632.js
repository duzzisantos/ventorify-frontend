module.exports = (app) => {
  const price = require("../controllers/prices.controllers");
  const { getRateLimiter } = require("../utils/getRateLimiter");
  var express = require("express");
  let router = express.Router();

  router.get("/", getRateLimiter, price.getAllPrices);
  router.get("/:id", getRateLimiter, price.getSinglePriceById);
  router.put("/:id", getRateLimiter, price.updateSinglePrice);
  router.post("/", getRateLimiter, price.createPriceList);
  router.delete("/:id", getRateLimiter, price.deleteSinglePrice);
  app.use("/api/price-list", router);
};
