const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database.js");

class Permission extends Model {}
Permission.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Permission",
  }
);

Permission.getPermissions = async function () {

  let rows = await Permission.findAll({
    raw: true,
  });
  return rows;
};

module.exports=Permission;