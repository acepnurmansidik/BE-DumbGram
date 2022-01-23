const express = require("express");
const { isLoginAuthorization } = require("../middleware/index");
const { actionSendMessage } = require("./controller");
const router = express.Router();

router.use(isLoginAuthorization);
router.post("/message/:id", actionSendMessage);

module.exports = router;
