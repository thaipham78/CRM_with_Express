const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database.js");


class Role extends Model {}
Role.init(
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
    modelName: "Role",
  }
);

Role.getRoles = async function () {

  let rows = await Role.findAll({
    raw: true,
  });
  return rows;
};



module.exports=Role;