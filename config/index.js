const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  jwtKey: process.env.SECRET,
  uploadPath: process.env.FILE_PATH,
};
