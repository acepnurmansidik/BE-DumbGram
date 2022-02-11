const { user, chat, notifmessage } = require("../../models");

module.exports = {
  // SEND MESSAGE ====================================================
  actionSendMessage: async (req, res) => {
    try {
      const { id } = req.params;
      const messageSend = req.body.message;

      // create message
      await chat.create({
        message: messageSend,
        idSender: req.userPlayer.id,
        idReceiver: id,
      });

      // create notif message
      await notifmessage.create({
        title: `${req.userPlayer.username} messaged you`,
        status: "unread",
        idReceiver: id,
        idSender: req.userPlayer.id,
      });

      const data = await chat.findOne({
        where: {
          message: messageSend,
          idSender: req.userPlayer.id,
          idReceiver: id,
        },
        attributes: ["id", "message"],
        include: [
          {
            model: user,
            as: "receiver",
            attributes: ["id", "username", "fullname", "image"],
          },
          {
            model: user,
            as: "sender",
            attributes: ["id", "username", "fullname", "image"],
          },
        ],
      });

      res.status(201).json({
        status: "success",
        message: "Message send",
        data: { Message: data },
      });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
  getMessage: async (req, res) => {
    try {
      const { id } = req.params;

      const Message = await chat.findAll({
        where: {
          idSender: [req.userPlayer.id, id],
          idReceiver: [req.userPlayer.id, id],
        },
        attributes: {
          exclude: ["updatedAt", "idSender", "idReceiver"],
        },
        include: [
          {
            model: user,
            as: "receiver",
            attributes: ["id", "username", "fullname", "image"],
          },
          {
            model: user,
            as: "sender",
            attributes: ["id", "username", "fullname", "image"],
          },
        ],
      });

      res.status(200).json({
        status: "success",
        message: "Message send",
        data: { Message },
      });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
  // CHAT LIST MESSAGE ===============================================
  getChatListSender: async (req, res) => {
    try {
      let chatList = await chat.findAll({
        where: {
          idSender: req.userPlayer.id,
        },
        group: "idReceiver",
        attributes: ["id", "createdAt", "message"],
        include: [
          {
            model: user,
            as: "receiver",
            attributes: ["id", "username", "fullname", "image"],
          },
          {
            model: user,
            as: "sender",
            attributes: ["id", "username", "fullname", "image"],
          },
        ],
      });

      res.status(200).json({
        status: "success",
        message: "Message send",
        data: { chatList },
      });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
  getChatListReceiver: async (req, res) => {
    try {
      let chatList = await chat.findAll({
        where: {
          idReceiver: req.userPlayer.id,
        },
        group: "idSender",
        attributes: ["id", "createdAt", "message"],
        include: [
          {
            model: user,
            as: "receiver",
            attributes: ["id", "username", "fullname", "image"],
          },
          {
            model: user,
            as: "sender",
            attributes: ["id", "username", "fullname", "image"],
          },
        ],
      });

      res.status(200).json({
        status: "success",
        message: "Message send",
        data: { chatList },
      });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
  // GET NOTIF MESSAGE ===============================================
  getNotifMessage: async (req, res) => {
    try {
      const notif = await notifmessage.findAll({
        where: {
          status: "unread",
          idReceiver: req.userPlayer.id,
        },
        attributes: ["id", "title", "status"],
        group: "idSender",
        include: [
          {
            model: user,
            as: "receiver",
            attributes: ["id", "fullname", "image"],
          },
          {
            model: user,
            as: "sender",
            attributes: ["id", "fullname", "image"],
          },
        ],
      });
      res.status(200).json({
        status: "success",
        message: "Message send",
        data: { notif },
      });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
  actionUpdateNotif: async (req, res) => {
    p;
    const { id } = req.params;
    const notif = await notifmessage.destroy({
      where: {
        status: "unread",
        idReceiver: req.userPlayer.id,
        idSender: id,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Notifaication has been deleted",
      data: { notif },
    });
    try {
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
};
