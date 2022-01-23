const express = require("express");
const { isLoginAuthorization } = require("../middleware/index");
const {
  actionCreateFeed,
  getFeed,
  getAllFeeds,
  actionCreateComment,
  getComments,
} = require("./controller");
const { uploadFile } = require("../middleware/uploadFile");
const router = express.Router();

router.use(isLoginAuthorization);
router.get("/feed/:id", getFeed);
router.get("/feeds", getAllFeeds);
router.post("/feed", uploadFile("image"), actionCreateFeed);
router.post("/comment", actionCreateComment);
router.get("/comments/:id", getComments);

module.exports = router;
