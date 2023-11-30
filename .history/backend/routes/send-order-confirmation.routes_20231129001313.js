module.exports = (app) => {
  const {
    sendOrderConfirmation,
    getOrderConfirmation,
    updateCustomerPayment,
  } = require("../controllers/send-order-confirmation.controllers");
  const { getRateLimiter } = require("../utils/getRateLimiter");
  var router = require("express").Router();
  router.post("/", getRateLimiter, sendOrderConfirmation);
  router.get("/", getRateLimiter, getOrderConfirmation);
  router.put("/:id", getRateLimiter, updateCustomerPayment);
  app.use("/api/customer-order", router);
};
