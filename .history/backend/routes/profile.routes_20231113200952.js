const auth = require("../controllers/profile.controllers");
var router = require("express").Router();

router.get("/", auth.ensureAuth, (req, res) => {
  res.send("Authenticated");
});

router.get("/logout", (req, res) => {
  req.logout();
});

router.post("/signup", auth.toSignup);
router.post(
  "/login",
  auth.passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

module.exports = router;
