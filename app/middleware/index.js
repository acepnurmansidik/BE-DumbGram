const jwt = require("jsonwebtoken");
const config = require("../../config/index");

module.exports = {
  isLoginAuthorization: async (req, res, next) => {
    try {
      const token = req.headers.authorization
        ? req.headers.authorization.replace("Bearer ", "")
        : null;

      const data = jwt.verify(token, config.jwtKey);
      if (!data) {
        throw new Error();
      }

      const userPlayer = {
        id: data.id,
        username: data.username,
        fullname: data.fullname,
      };

      //   send data token
      req.token = token;
      req.userPlayer = userPlayer;
      next();
    } catch (err) {
      res.status(401).json({
        status: "forbidden",
        message: "Not authorized to access this resource",
      });
    }
  },
};
