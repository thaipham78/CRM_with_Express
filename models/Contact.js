const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database.js");
const Company = require("./Company.js");
class Contact extends Model {}
Contact.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    createdBy: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Contact",
  }
);

Contact.addContact = async function (data, company) {
  let inputContact = await Contact.create(data);
  await inputContact.setCompany(company);
};

Contact.updateContact = async function (data, id, company) {
  let updateContact = await Contact.update(data, { where: { id: id } });
  if (company) {
    let queryContact = await Contact.findByPk(id);
    await queryContact.setCompany(company);
  }
};

Contact.getContacts = async function (offset, limit) {
  let total = await Contact.count();

  let rows = await Contact.findAll({
    limit: +limit,
    offset: +offset,
    raw: true,
    include: [{ model: Company, required: true }],
  });
  // console.log(rows);
  return { total, rows };
};

Contact.getContact = async function (id) {
  let queryContact = await Contact.findByPk(id);
  let relatedCompany = null;
  // console.log(queryContact,"db");
  if (queryContact) {
 
    relatedCompany = await queryContact.getCompany();
  }
  return { queryContact, relatedCompany };
};

Contact.getContactByName = async function (name) {
  return await Contact.findOne({where:{name:name}})
};


Contact.removeContact = async function (id) {
  return await Contact.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = Contact;
