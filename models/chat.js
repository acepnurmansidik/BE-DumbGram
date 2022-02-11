"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      chat.belongsTo(models.user, {
        as: "receiver",
        foreignKey: {
          name: "idReceiver",
        },
      });
      chat.belongsTo(models.user, {
        as: "sender",
        foreignKey: {
          name: "idSender",
        },
      });
    }
  }
  chat.init(
    {
      message: DataTypes.TEXT,
      idSender: DataTypes.INTEGER,
      idReceiver: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "chat",
    }
  );
  return chat;
};
