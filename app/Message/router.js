const express = require("express");
const { isLoginAuthorization } = require("../middleware/index");
const {
  actionSendMessage,
  getMessage,
  getChatListSender,
  getChatListReceiver,
} = require("./controller");
const router = express.Router();

router.use(isLoginAuthorization);
router.post("/message/:id", actionSendMessage);
router.get("/message-user/:id", getMessage);
router.get("/message-sender", getChatListSender);
router.get("/message-receiver", getChatListReceiver);

module.exports = router;
