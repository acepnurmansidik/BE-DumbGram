const { user, message } = require("../../models");

module.exports = {
  actionSendMessage: async (req, res) => {
    try {
      const { id } = req.params;
      const messageSend = req.body.message;

      await message.create({
        message: messageSend,
        idSender: req.userPlayer.id,
        idReceiver: id,
      });

      const data = await message.findOne({
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

      const Message = await message.findAll({
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
  getChatListSender: async (req, res) => {
    try {
      let chatList = await message.findAll({
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
      let chatList = await message.findAll({
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
};
