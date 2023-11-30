const goods = require("../controllers/aggregate-goods");

module.exports = (app) => {
  const express = require("express");
  var router = express.Router();
  const limiter = require("../utils/getRateLimiter");

  router.get("/", limiter.getRateLimiter, goods.aggregateProducts);
  router.post(
    "/:id",
    limiter.getRateLimiter,
    goods.transferAggregateGoodsToShelf
  );
  router.delete("/", limiter.getRateLimiter, goods.deleteAggregatedGoods);
  app.use("/api/aggregate-goods", router);
};
