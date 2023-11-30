module.exports = (app) => {
  const purchase = require("../controllers/purchase-request.controllers");
  const { getRateLimiter } = require("../utils/getRateLimiter");
  var router = require("express").Router();
  router.get("/:id", getRateLimiter, purchase.find);
  router.get("/", getRateLimiter, purchase.findAll);
  app.use("/api/reorder", router);
};
