const { user } = require("../../models");

module.exports = {
  getUsers: async (req, res) => {
    try {
      let data = await user.findAll();
      data.map((item) => {
        delete item.dataValues.password;
        delete item.dataValues.createdAt;
        delete item.dataValues.updatedAt;
      });
      res.status(200).json({ status: "success", data: { user: data } });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
  actionEditUser: async (req, res) => {
    try {
      const { id } = req.params;
      const payload = req.body;

      await user.update(payload, { where: { id } });
      const data = await user.findOne({ where: { id } });

      delete data.dataValues.password;
      delete data.dataValues.createdAt;
      delete data.dataValues.updatedAt;

      res.status(201).json({
        status: "success",
        message: "Data has been update",
        data: { user: data },
      });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
};
