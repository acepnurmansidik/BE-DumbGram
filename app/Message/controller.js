const { Op } = require("sequelize");
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
        attributes: {
          exclude: ["createdAt", "updatedAt", "idSender", "idReceiver"],
        },
        include: {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "bio", "email"],
          },
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

      const data = await message.findAll({
        idSender: {
          [Op.or]: {
            [Op.eq]: [req.userPlayer.id, id],
          },
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "idSender", "idReceiver"],
        },
        include: {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "bio", "email"],
          },
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
};
