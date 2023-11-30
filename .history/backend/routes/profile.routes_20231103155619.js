const { Signup } = require("../controllers/profile.controllers");
const router = require("express").Router();

router.post("/auth-signup", Signup);
module.exports = router;
