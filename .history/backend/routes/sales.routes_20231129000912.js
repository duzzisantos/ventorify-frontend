module.exports = (app) => {
  const sales = require("../controllers/sales.controllers");
  const { getRateLimit } = require("../utils/getRateLimiter");
  var router = require("express").Router();
  router.get("/", getRateLimit, sales.findAll);
  router.get("/:customerId", getRateLimit, sales.generateOrderSummary);
  router.put("/:product", getRateLimit, sales.fromShelfToSales);
  router.delete("/", getRateLimit, sales.deleteAllSales);

  app.use("/api/sales", router);
};
