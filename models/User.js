const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database.js");
const { permission, user_role } = require("./index.js");

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "User",
  }
);

User.addUser = async function (data, role, permissions) {
  let inputUser = await User.create(data);

  permissions.forEach(async (permission) => {
    if (permission && role) {
      await role.addPermission(permission);
    }
  });

  await inputUser.setRole(role);
};

User.getUsers = async function (offset, limit) {
  let total = await User.count();

  let rows = await User.findAll({
    limit: +limit,
    offset: +offset,
    raw: true,
    include: { all: true },
  });
  // console.log(rows);
  return { total, rows };
};

User.getUser = async function (id) {
  let queryUser = await User.findByPk(id);
  let relatedRole = await queryUser.getRole();

  return { queryUser, relatedRole };
};

User.getByName = async function (name) {
  let queryUser = await User.findOne({ where: { name: name } });
  let relatedRole = null;
  if(queryUser){
    relatedRole=await queryUser.getRole();
    return { queryUser, relatedRole };
  }
  
};

User.removeUser = async function (id) {
  return await User.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = User;
