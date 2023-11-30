const auth = require("../controllers/profile.controllers");
var router = require("express").Router();

router.get("/", auth.ensureAuth, (req, res) => {
  res.send("Authenticated");
});

//logout route

router.get("/logout", (req, res) => {
  if (req.isAuthenticated()) {
    req.logout();
    res.clearCookie("connect.sid", { path: "/" });
    return res.json({ message: "Logout successful" });
  } else {
    return res.status(401).json({ message: "User not authenticated" });
  }
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
