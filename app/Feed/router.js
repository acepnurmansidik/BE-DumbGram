const express = require("express");
const { isLoginAuthorization } = require("../middleware/index");
const { actionCreateFeed, getFeed } = require("./controller");
const { uploadFile } = require("../middleware/uploadFile");
const router = express.Router();

router.use(isLoginAuthorization);
router.get("/feed/:id", getFeed);
router.post("/feed", uploadFile("image"), actionCreateFeed);

module.exports = router;