const { user, follow } = require("../../models");

module.exports = {
  getUsers: async (req, res) => {
    try {
      let data = await user.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      });
      res.status(200).json({
        status: "success",
        message: "Data has been successfully obtained",
        data: { user: data },
      });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
  actionEditUser: async (req, res) => {
    try {
      const { id } = req.params;
      const payload = req.body;

      await user.update(payload, { where: { id } });
      const data = await user.findOne({
        where: { id },
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      });

      res.status(201).json({
        status: "success",
        message: "Data has been update",
        data: { user: data },
      });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
  actionDeleteUser: async (req, res) => {
    try {
      const { id } = req.params;

      const data = await user.destroy({ where: { id } });

      res.status(200).json({
        status: "success",
        message: "Data has been successfully delete",
        data: { data },
      });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
  getFollowers: async (req, res) => {
    try {
      const { id } = req.params;

      const followers = await follow.findAll({
        where: { idUser: id, status: "followers" },
        attributes: {
          exclude: ["createdAt", "updatedAt", "status", "idUser", "idFollow"],
        },
        include: {
          model: user,
          as: "user",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "bio",
              "image",
              "email",
            ],
          },
        },
      });

      res.status(200).json({
        status: "success",
        message: "Data has been successfully obtained",
        data: { followers },
      });
    } catch (error) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
  getFollowing: async (req, res) => {
    try {
      const { id } = req.params;

      const following = await follow.findAll({
        where: { idUser: id, status: "following" },
        attributes: {
          exclude: ["createdAt", "updatedAt", "status", "idUser", "idFollow"],
        },
        include: {
          model: user,
          as: "user",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "bio",
              "image",
              "email",
            ],
          },
        },
      });

      res.status(200).json({
        status: "success",
        message: "Data has been successfully obtained",
        data: { following },
      });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
};
