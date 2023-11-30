module.exports = (app) => {
  const shelf = require("../controllers/shelf.controllers");
  const { getRateLimiter } = require("../utils/getRateLimiter");
  var express = require("express");
  var router = express.Router();
  router.get("/", getRateLimiter, shelf.findAll);
  router.delete("/", getRateLimiter, shelf.deleteAll);
  router.post("/:id", getRateLimiter, shelf.transferItem);
  app.use("/api/shelf", router);
};
