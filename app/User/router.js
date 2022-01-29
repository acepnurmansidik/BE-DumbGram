const express = require("express");
const { isLoginAuthorization } = require("../middleware/index");
const {
  getUsers,
  actionEditUser,
  actionDeleteUser,
  getFollowers,
  getFollowing,
  actionFollow,
  actionDeleteFollow,
  getUser,
} = require("./controller");
const router = express.Router();

router.get("/users", getUsers);
router.use(isLoginAuthorization);
router.get("/followers/:id", getFollowers);
router.get("/following/:id", getFollowing);
router.get("/user/:id", getUser);
router.post("/following/:id", actionFollow);
router.delete("/following/:id", actionDeleteFollow);

router.patch("/user/:id", actionEditUser);
router.delete("/user/:id", actionDeleteUser);

module.exports = router;
