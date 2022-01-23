const jwt_decode = require("jwt-decode");
const { user, feed, comments } = require("../../models");

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
  actionCreateComment: async (req, res) => {
    try {
      let payload = req.body;
      const dataDecode = jwt_decode(req.token);

      const data = await comments.create({
        idUser: dataDecode.id,
        ...payload,
      });

      res
        .status(201)
        .json({ status: "success", data: { comment: { id: data.idUser } } });
    } catch (error) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
  getComments: async (req, res) => {
    try {
      const { id } = req.params;

      const data = await comments.findAll({
        where: {
          idFeed: id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "idUser", "idFeed"],
        },
        include: [
          {
            model: user,
            as: "user",
            attributes: {
              exclude: ["createdAt", "updatedAt", "password", "bio", "email"],
            },
          },
          {
            model: feed,
            as: "feed",
            attributes: {
              exclude: ["createdAt", "updatedAt", "id", "like", "idUser"],
            },
          },
        ],
      });

      res.status(200).json({ status: "success", data: { comments: data } });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
};
