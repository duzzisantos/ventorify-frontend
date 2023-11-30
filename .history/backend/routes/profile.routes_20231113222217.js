const auth = require("../controllers/profile.controllers");
var router = require("express").Router();

router.get("/verify-auth", auth.ensureAuth, (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ authenticated: true, username: req.user.username });
  } else {
    res.json({ authenticated: false, message: "Not authenticated" });
  }
});

//logout route
router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

//signup route
router.post("/signup", auth.toSignup);

//login route
router.post(
  "/login",
  auth.passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

module.exports = router;
