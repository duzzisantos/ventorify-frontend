const goods = require("../controllers/aggregate-goods");

module.exports = (app) => {
  const express = require("express");
  var router = express.Router();
  const limiter = require("../utils/getRateLimiter");

  router.get("/", limiter, goods.aggregateProducts);
  router.post("/:id", limiter, goods.transferAggregateGoodsToShelf);
  router.delete("/", limiter, goods.deleteAggregatedGoods);
  app.use("/api/aggregate-goods", router);
};
