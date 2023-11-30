const { userVerification } = require("../middleware/authMiddleWare");

const profile = require("../controllers/profile.controllers");
const router = require("express").Router();

router.post("/auth-signup", profile.Signup);
router.post("/auth-login", profile.Login);
router.post("/", userVerification);

module.exports = router;
