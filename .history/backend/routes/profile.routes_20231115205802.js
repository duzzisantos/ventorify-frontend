const auth = require("../controllers/profile.controllers");
var router = require("express").Router();

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
    successRedirect: "/profile",
    failureRedirect: "/login",
  })
);

//verify if user is actually authenticated so that we can use their auth
router.get("/check-auth", (req, res) => {
  res.json({
    authenticated: "we do not know",
    message: "not sure about auth but the route works",
  });
});

module.exports = router;
