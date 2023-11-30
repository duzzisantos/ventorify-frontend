module.exports = (app) => {
  const sales = require("../controllers/sales.controllers");
  const { getRateLimiter } = require("../utils/getRateLimiter");
  var router = require("express").Router();
  router.get("/", getRateLimiter, sales.findAll);
  router.get("/:customerId", getRateLimiter, sales.generateOrderSummary);
  router.put("/:product", getRateLimiter, sales.fromShelfToSales);
  router.delete("/", getRateLimiter, sales.deleteAllSales);

  app.use("/api/sales", router);
};
