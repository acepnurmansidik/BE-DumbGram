const express = require("express");
const { SignUp, SignIn } = require("./controller");
const router = express.Router();

router.post("/register", SignUp);
router.post("/login", SignIn);

module.exports = router;
