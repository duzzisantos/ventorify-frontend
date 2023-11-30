module.exports = (app) => {
  const team = require("../controllers/team.controllers");
  const { getRateLimiter } = require("../utils/getRateLimiter");
  var router = require("express").Router();
  router.get("/", getRateLimiter, team.findAll);
  app.use("/api/team", router);
};
