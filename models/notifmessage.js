"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class notifmessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      notifmessage.belongsTo(models.user, {
        as: "receiver",
        foreignKey: {
          name: "idReceiver",
        },
      });
      notifmessage.belongsTo(models.user, {
        as: "sender",
        foreignKey: {
          name: "idSender",
        },
      });
    }
  }
  notifmessage.init(
    {
      title: DataTypes.STRING,
      status: DataTypes.STRING,
      idReceiver: DataTypes.INTEGER,
      idSender: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "notifmessage",
    }
  );
  return notifmessage;
};
