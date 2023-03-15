const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database.js");


class RolePermission extends Model {}
RolePermission.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    sequelize,
    modelName: "RolePermission",
  }
);

module.exports=RolePermission;