module.exports = (app) => {
  const aggregateShelf = require("../controllers/aggregate-shelf");
  const limiter = require("../utils/getRateLimiter");
  var express = require("express");
  let router = express.Router();

  router.get("/", limiter.getRateLimiter, aggregateShelf.aggregateShelfItems);
  router.delete("/", limiter.getRateLimiter, aggregateShelf.deleteAll);
  router.delete(
    "/:id",
    limiter.getRateLimiter,
    aggregateShelf.deleteAggregatedProductById
  );
  app.use("/api/aggregate-shelf-items", router);
};
