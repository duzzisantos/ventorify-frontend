module.exports = (app) => {
  const aggregateShelf = require("../controllers/aggregate-shelf");
  const limiter = require("../utils/getRateLimiter");
  var express = require("express");
  let router = express.Router();

  router.get("/", aggregateShelf.aggregateShelfItems);
  router.delete("/", aggregateShelf.deleteAll);
  router.delete(
    "/:id",

    aggregateShelf.deleteAggregatedProductById
  );
  app.use("/api/aggregate-shelf-items", router);
};
