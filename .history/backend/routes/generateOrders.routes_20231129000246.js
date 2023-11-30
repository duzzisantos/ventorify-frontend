module.exports = (app) => {
  const sales = require("../controllers/generateOrders");
  const limiter = require("../utils/getRateLimiter");
  var router = require("express").Router();
  router.get(
    "/:customerId",
    limiter.getRateLimiter,
    sales.dispatchOrderSummary
  );
  app.use("/api/generate-order", router);
};
