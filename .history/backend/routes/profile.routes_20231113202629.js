const auth = require("../controllers/profile.controllers");
var router = require("express").Router();

router.get("/", auth.ensureAuth, (req, res) => {
  res.send("Authenticated");
});

//logout route
router.get("/logout", (req, res) => {
  // Call req.logout() with a callback function
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    // Redirect the user to a different page after logout
    res.redirect("/login"); // You can redirect to the home page or any other page
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
