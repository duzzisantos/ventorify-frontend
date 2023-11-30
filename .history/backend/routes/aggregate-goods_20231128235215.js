import { rateLimiter } from "express-rate-limiter";
const goods = require("../controllers/aggregate-goods");

module.exports = (app) => {
  const express = require("express");
  var router = express.Router();

  const limiter = rateLimiter({
    windowMS: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  });
  router.get("/", limiter, goods.aggregateProducts);
  router.post("/:id", limiter, goods.transferAggregateGoodsToShelf);
  router.delete("/", limiter, goods.deleteAggregatedGoods);
  app.use("/api/aggregate-goods", router);
};
