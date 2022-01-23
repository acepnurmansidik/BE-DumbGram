const express = require("express");
const { isLoginAuthorization } = require("../middleware/index");
const { actionCreateFeed } = require("./controller");
const { uploadFile } = require("../middleware/uploadFile");
const router = express.Router();

router.use(isLoginAuthorization);
router.post("/feed", uploadFile("image"), actionCreateFeed);

module.exports = router;
