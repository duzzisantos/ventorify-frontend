module.exports = (app) => {
  const auth = require("../controllers/profile.controllers");
  var router = require("express").Router();

  router.get("/", auth.ensureAuth, (req, res) => {
    res.send("Authenticated");
  });

  router.post("/user/signup/", auth.toSignup);
  router.post(
    "/login",
    auth.passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
    })
  );

  app.use("/api/auth", router);
};
