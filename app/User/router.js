const express = require("express");
const { isLoginAuthorization } = require("../middleware/index");
const { getUsers } = require("./controller");
const router = express.Router();

router.get("/users", getUsers);
router.use(isLoginAuthorization);

module.exports = router;
