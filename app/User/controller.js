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
      console.log(data);
      res.status(200).json({ status: "success", data: { user: data } });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
};
