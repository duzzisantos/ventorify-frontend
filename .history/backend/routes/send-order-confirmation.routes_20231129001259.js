module.exports = (app) => {
  const {
    sendOrderConfirmation,
    getOrderConfirmation,
    updateCustomerPayment,
  } = require("../controllers/send-order-confirmation.controllers");
  const { getRateLimiter } = require("../utils/getRateLimiter");
  var router = require("express").Router();
  router.post("/", getRateLimiter, confirmation.sendOrderConfirmation);
  router.get("/", getRateLimiter, confirmation.getOrderConfirmation);
  router.put("/:id", getRateLimiter, confirmation.updateCustomerPayment);
  app.use("/api/customer-order", router);
};
