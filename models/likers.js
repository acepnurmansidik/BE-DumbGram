"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class likers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      likers.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "idUser",
        },
      });
      likers.belongsTo(models.feed, {
        as: "feed",
        foreignKey: {
          name: "idFeed",
        },
      });
    }
  }
  likers.init(
    {
      idUser: DataTypes.INTEGER,
      idFeed: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "likers",
    }
  );
  return likers;
};
