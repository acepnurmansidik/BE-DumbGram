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
          idSender: req.userPlayer.id,
          idReceiver: id,
        },
        include: {
          model: user,
          as: "user",
          attributes: ["id", "username", "fullname", "image"],
        },
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
          exclude: ["updatedAt"],
        },
        include: {
          model: user,
          as: "user",
          attributes: ["id", "username", "fullname", "image"],
        },
      });

      res.status(201).json({
        status: "success",
        message: "Message send",
        data: { Message },
      });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
  getChatList: async (req, res) => {
    try {
      let chatidSender = await message.findAll({
        attributes: {
          exclude: ["updatedAt", "message"],
        },
        group: "idReceiver",
        include: {
          model: user,
          as: "userSender",
          attributes: ["id", "username", "fullname", "image"],
        },
      });

      let chatidReceiver = await message.findAll({
        attributes: {
          exclude: ["updatedAt", "message"],
        },
        group: "idReceiver",
        include: {
          model: user,
          as: "userReceiver",
          attributes: ["id", "username", "fullname", "image"],
        },
      });

      res.status(201).json({
        status: "success",
        message: "Message send",
        data: { chatList: { chatidSender, chatidReceiver } },
      });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
};
