module.exports = (app) => {
  const message = require("../controllers/messages.controllers");
  const limiter = require("../utils/getRateLimiter");
  var express = require("express");
  var router = express.Router();

  router.post("/", limiter.getRateLimiter, message.create);
  router.get("/", limiter.getRateLimiter, message.findAll);
  router.get("/:id", limiter.getRateLimiter, message.findOne);
  router.put("/:id", limiter.getRateLimiter, message.update);
  router.delete("/:id", limiter.getRateLimiter, message.deleteOne);
  app.use("/api/messages", router);
};
