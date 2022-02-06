const express = require("express");
const { isLoginAuthorization } = require("../middleware/index");
const {
  actionSendMessage,
  getMessage,
  getChatListSender,
  getChatListReceiver,
  getNotifMessage,
  actionUpdateNotif,
} = require("./controller");
const router = express.Router();

router.use(isLoginAuthorization);
router.post("/message/:id", actionSendMessage);
router.get("/message-user/:id", getMessage);
router.get("/message-sender", getChatListSender);
router.get("/message-receiver", getChatListReceiver);

// NOTIF MESSAGE =======================================
router.get("/notif-message", getNotifMessage);
router.delete("/notif-message/:id", actionUpdateNotif);

module.exports = router;
