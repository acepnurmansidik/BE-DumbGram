const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("../../config/index");
const { user } = require("../../models");

module.exports = {
  SignUp: async (req, res) => {
    //   validate sing joi
    const schema = Joi.object({
      username: Joi.string().required(),
      fullname: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    //   create schema validate
    const { error } = schema.validate(req.body);

    // if error exist send validation error message
    if (error)
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    try {
      let { password, ...payload } = req.body;
      const salt = await bcrypt.genSalt(10);
      // we hash password from request with salt
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await user.create({
        ...payload,
        password: hashedPassword,
      });
      //   create token
      const token = jwt.sign(
        {
          ...payload,
        },
        config.jwtKey
      );
      res.status(200).json({
        status: "success",
        message: "Successfully created account",
        data: {
          user: {
            username: payload.username,
            fullname: payload.fullname,
            token,
          },
        },
      });
    } catch (err) {
      res.status(500).json({ status: "failed", message: "Server error" });
    }
  },
};
