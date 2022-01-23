const express = require("express");
const { isLoginAuthorization } = require("../middleware/index");
const { getUsers, actionEditUser } = require("./controller");
const router = express.Router();

router.get("/users", getUsers);
router.patch("/user/:id", actionEditUser);
router.use(isLoginAuthorization);

module.exports = router;
