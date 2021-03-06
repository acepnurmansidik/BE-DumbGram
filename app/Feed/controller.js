const { user, feed, comments, likesfeed, sequelize } = require("../../models");
const { uploadPath } = require("../../config");

module.exports = {
  // FEED ================================================
  actionCreateFeed: async (req, res) => {
    try {
      const payload = req.body;

      let newFeed = await feed.create({
        ...payload,
        filename: req.file.filename,
        idUser: req.userPlayer.id,
      });

      let dataFeed = await feed.findOne({
        where: {
          id: newFeed.id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "like", "idUser"],
        },
        include: {
          model: user,
          as: "user",
          attributes: ["id", "username", "fullname", "image"],
        },
      });

      dataFeed.filename = `${uploadPath}${dataFeed.filename}`;

      res.status(201).json({ status: "success", data: { feed: dataFeed } });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
  getFeed: async (req, res) => {
    try {
      const { id } = req.params;

      let dataFeed = await feed.findAll({
        where: {
          idUser: id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "idUser"],
        },
        include: {
          model: user,
          as: "user",
          attributes: ["id", "username", "fullname", "image"],
        },
      });

      dataFeed.map((feed) => {
        feed.filename = `${uploadPath}${feed.filename}`;
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
          attributes: ["id", "username", "fullname", "image"],
        },
        order: sequelize.random(),
      });

      dataFeed.map((feed) => {
        feed.filename = `${uploadPath}${feed.filename}`;
      });

      res.status(201).json({ status: "success", data: { feed: dataFeed } });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
  // COMMENT =============================================
  actionCreateComment: async (req, res) => {
    try {
      let payload = req.body;

      const data = await comments.create({
        idUser: req.userPlayer.id,
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
        attributes: ["id", "comment"],
        include: [
          {
            model: user,
            as: "user",
            attributes: ["id", "username", "fullname", "image"],
          },
        ],
      });

      res.status(200).json({ status: "success", data: { comments: data } });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
  // LIKE ================================================
  getLikeFeed: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await likesfeed.findAll({
        where: {
          idFeed: id,
        },
        attributes: ["id"],
        include: [
          {
            model: user,
            as: "user",
            attributes: ["id", "username", "fullname"],
          },
          {
            model: feed,
            as: "feed",
            attributes: ["id"],
          },
        ],
      });
      res.status(200).json({ status: "success", data: { likes: data } });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
  actionAddLikers: async (req, res) => {
    try {
      const { id } = req.params;

      let data = await likesfeed.findOne({
        where: {
          idFeed: id,
          idUser: req.userPlayer.id,
        },
      });

      if (data) {
        data = await likesfeed.destroy({
          where: {
            idFeed: id,
            idUser: req.userPlayer.id,
          },
        });
      } else {
        data = await likesfeed.create({
          idFeed: id,
          idUser: req.userPlayer.id,
          countLike: 1,
        });
      }

      res.status(200).json({ status: "sucess", data: { feed: id } });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
};
