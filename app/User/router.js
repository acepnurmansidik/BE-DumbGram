const express = require("express");
const { isLoginAuthorization } = require("../middleware/index");
const { getUsers, actionEditUser, actionDeleteUser } = require("./controller");
const router = express.Router();

router.get("/users", getUsers);
router.use(isLoginAuthorization);
router.patch("/user/:id", actionEditUser);
router.delete("/user/:id", actionDeleteUser);

module.exports = router;
