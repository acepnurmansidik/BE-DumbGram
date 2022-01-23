const jwt_decode = require("jwt-decode");
const { user, feed } = require("../../models");

module.exports = {
  actionCreateFeed: async (req, res) => {
    try {
      const payload = req.body;
      const dataDecode = jwt_decode(req.token);

      const newFeed = await feed.create({
        ...payload,
        filename: req.file.filename,
        idUser: dataDecode.id,
      });

      const dataFeed = await feed.findOne({
        where: {
          id: newFeed.id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "like", "idUser"],
        },
        include: {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "bio", "email"],
          },
        },
      });

      res.status(201).json({ status: "success", data: { feed: dataFeed } });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
  getFeed: async (req, res) => {
    try {
      const { id } = req.params;

      const dataFeed = await feed.findAll({
        where: {
          idUser: id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "idUser"],
        },
        include: {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "bio", "email"],
          },
        },
      });

      res.status(201).json({ status: "success", data: { feed: dataFeed } });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
  getAllFeeds: async (req, res) => {
    try {
      const dataFeed = await feed.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt", "idUser"],
        },
        include: {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "bio", "email"],
          },
        },
      });

      res.status(201).json({ status: "success", data: { feed: dataFeed } });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
};
