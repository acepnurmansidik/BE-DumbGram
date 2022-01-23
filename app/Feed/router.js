const express = require("express");
const { isLoginAuthorization } = require("../middleware/index");
const {
  actionCreateFeed,
  getFeed,
  getAllFeeds,
  actionCreateComment,
} = require("./controller");
const { uploadFile } = require("../middleware/uploadFile");
const router = express.Router();

router.use(isLoginAuthorization);
router.get("/feed/:id", getFeed);
router.get("/feeds", getAllFeeds);
router.post("/feed", uploadFile("image"), actionCreateFeed);
router.post("/comment", actionCreateComment);

module.exports = router;
