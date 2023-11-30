module.exports = (app) => {
  const sales = require("../controllers/sales.controllers");
  var router = require("express").Router();
  router.get("/", sales.findAll);
  router.get("/:customerId", sales.generateOrderSummary);
  router.post("/dispatch-orders/:customerId", sales.dispatchOrderSummary);
  router.put("/:product", sales.fromShelfToSales);
  router.delete("/", sales.deleteAllSales);

  app.use("/api/sales", router);
};
