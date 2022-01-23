const express = require("express");
const { SignUp } = require("./controller");
const router = express.Router();

router.post("/register", SignUp);

module.exports = router;
