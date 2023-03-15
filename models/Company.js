const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database.js");

class Company extends Model {}

Company.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Company",
  }
);

Company.addCompany = async function (data) {
  await Company.create(data);
};

Company.updateCompany = async function (data, id) {
  await Company.update(data, { where: { id: id } });
};


Company.getCompanies = async function (offset, limit) {
  let total=await Company.count();
  let rows=await Company.findAll({ offset: +offset, limit: +limit,raw:true })
  return {total,rows};
};

Company.getCompany = async function (id) {
  return await Company.findByPk(id);
};

Company.getCompanyByName = async function (name) {
  return await Company.findOne({where:{name:name}})
};


Company.removeCompany = async function (id) {
  return await Company.destroy({
    where: {
      id: id,
    },
  });
};



module.exports = Company;
