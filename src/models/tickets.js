"use strict";
const { Model } = require("sequelize");
const { Enums } = require("../utils/common");
const { SUCCESS, PENDING, FAILED } = Enums.TICKET_STATUS;
module.exports = (sequelize, DataTypes) => {
  class Tickets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tickets.init(
    {
      subject: { type: DataTypes.STRING, allowNull: false },
      content: { type: DataTypes.STRING, allowNull: false },
      recepientEmail: { type: DataTypes.STRING, allowNull: false },
      status: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: [SUCCESS, PENDING, FAILED],
        defaultValue: PENDING,
      },
    },
    {
      sequelize,
      modelName: "Tickets",
    }
  );
  return Tickets;
};
