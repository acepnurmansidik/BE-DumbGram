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
  getUser: async (req, res) => {
    try {
      const { id } = req.params;
      let data = await user.findOne({
        where: {
          id,
        },
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

      if (req.file) {
        await user.update(
          { ...payload, image: req.file.filename },
          { where: { id } }
        );
      } else {
        await user.update(
          { ...payload, filename: oldIMG.filename },
          { where: { id } }
        );
      }
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
  // Follow =================================================
  getFollowers: async (req, res) => {
    try {
      const { id } = req.params;

      const followers = await follow.findAll({
        where: { idUser: id, status: "followers" },
        attributes: ["id"],
        include: {
          model: user,
          as: "user",
          attributes: ["id", "username", "fullname", "image"],
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
  getFollower: async (req, res) => {
    try {
      const { id } = req.params;

      const follower = await follow.findOne({
        where: { idUser: id, status: "followers" },
        attributes: ["id"],
        include: {
          model: user,
          as: "user",
          attributes: ["id", "username", "fullname", "image"],
        },
      });

      res.status(200).json({
        status: "success",
        message: "Data has been successfully obtained",
        data: { follower },
      });
    } catch (error) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
  getFollowings: async (req, res) => {
    try {
      const { id } = req.params;

      const following = await follow.findAll({
        where: { idUser: id, status: "following" },
        attributes: ["id"],
        include: {
          model: user,
          as: "user",
          attributes: ["id", "username", "fullname", "image"],
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
  getFollowingDetail: async (req, res) => {
    try {
      const { id } = req.params;

      const following = await follow.findAll({
        where: {
          idUser: req.userPlayer.id,
          idFollow: id,
          status: "following",
        },
        attributes: ["id"],
        include: {
          model: user,
          as: "user",
          attributes: ["id", "username", "fullname", "image"],
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
  actionToggleFollow: async (req, res) => {
    try {
      const { id } = req.params;
      let data;

      // Cek following
      let dataFollowing = await follow.findOne({
        where: {
          idUser: req.userPlayer.id,
          idFollow: id,
          status: "following",
        },
        raw: true,
      });

      // cek followers
      let dataFollowers = await follow.findOne({
        where: {
          idUser: id,
          idFollow: req.userPlayer.id,
          status: "followers",
        },
        raw: true,
      });

      if (dataFollowers && dataFollowing) {
        // if condition true, delete record with status following
        await follow.destroy({
          where: {
            idUser: req.userPlayer.id,
            idFollow: id,
            status: "following",
          },
          raw: true,
        });

        // if condition true, delete record with status followers
        await follow.destroy({
          where: {
            idUser: id,
            idFollow: req.userPlayer.id,
            status: "followers",
          },
          raw: true,
        });

        res.status(200).json({ status: "success", data: { unfollowing: id } });
      } else {
        // if condition false, create record with status following
        await follow.create({
          idUser: req.userPlayer.id,
          idFollow: id,
          status: "following",
        });

        // if condition false, create record with status followers
        await follow.create({
          idUser: id,
          idFollow: req.userPlayer.id,
          status: "followers",
        });

        res.status(200).json({ status: "success", data: { following: id } });
      }
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
};
