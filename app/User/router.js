const express = require("express");
const { isLoginAuthorization } = require("../middleware/index");
const { uploadFile } = require("../middleware/uploadFile");
const {
  getUsers,
  actionEditUser,
  actionDeleteUser,
  getFollowers,
  getFollowings,
  getUser,
  getFollower,
  actionToggleFollow,
  getFollowingDetail,
} = require("./controller");
const router = express.Router();

router.get("/users", getUsers);
router.use(isLoginAuthorization);
router.get("/user/:id", getUser);

router.get("/followers/:id", getFollowers);
router.get("/follower/:id", getFollower);

router.get("/following/:id", getFollowings);
router.get("/following-detail/:id", getFollowingDetail);
router.post("/following/:id", actionToggleFollow);

router.patch("/user/:id", uploadFile("image"), actionEditUser);
router.delete("/user/:id", actionDeleteUser);

module.exports = router;
