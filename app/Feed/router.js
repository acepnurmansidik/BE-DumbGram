const express = require("express");
const { isLoginAuthorization } = require("../middleware/index");
const {
  actionCreateFeed,
  getFeed,
  getAllFeeds,
  actionCreateComment,
  getComments,
  actionAddLikers,
  getLikeFeed,
} = require("./controller");
const { uploadFile } = require("../middleware/uploadFile");
const router = express.Router();

router.use(isLoginAuthorization);
// Feed
router.get("/feed/:id", getFeed);
router.get("/feeds", getAllFeeds);
router.post("/feed", uploadFile("image"), actionCreateFeed);
// comment
router.post("/comment", actionCreateComment);
router.get("/comments/:id", getComments);
// Liker
router.get("/like", getLikeFeed);
router.post("/like", actionAddLikers);

module.exports = router;
