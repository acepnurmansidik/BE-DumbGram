"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class likesfeed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      likesfeed.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "idUser",
        },
      });

      likesfeed.belongsTo(models.feed, {
        as: "feed",
        foreignKey: {
          name: "idFeed",
        },
      });
    }
  }
  likesfeed.init(
    {
      idFeed: DataTypes.INTEGER,
      idUser: DataTypes.INTEGER,
      countLike: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "likesfeed",
    }
  );
  return likesfeed;
};
