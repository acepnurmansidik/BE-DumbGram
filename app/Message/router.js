const express = require("express");
const { isLoginAuthorization } = require("../middleware/index");
const { actionSendMessage, getMessage, getChatList } = require("./controller");
const router = express.Router();

router.use(isLoginAuthorization);
router.post("/message/:id", actionSendMessage);
router.get("/message-user/:id", getMessage);
router.get("/message-user", getChatList);

module.exports = router;
