module.exports = (app) => {
  const purchase = require("../controllers/purchase-request.controllers");
  var express = require("express");
  var router = express.Router();
  router.post("/", purchase.create);
  app.use("/api/reorder", router);
};
