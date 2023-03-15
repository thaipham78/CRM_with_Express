const contact = require("./Contact.js");
const company = require("./Company.js");
const permission = require("./Permission.js");
const user_role = require("./Role.js");
const role_permission = require("./RolePermission.js");
const user = require("./User.js");

company.hasMany(contact);
contact.belongsTo(company);

user_role.hasMany(user);
user.belongsTo(user_role);

user_role.belongsToMany(permission, { through: role_permission });
permission.belongsToMany(user_role, { through: role_permission });

async function init_company_contact() {
  await contact.drop();
  await company.drop();
  await company.sync({ force: true });
  await contact.sync({ force: true });
}

async function init_user_role_permission() {
  await user.drop();
  await role_permission.drop();
  await user_role.drop();
  await permission.drop();
  await user_role.sync({ force: true });
  await permission.sync({ force: true });
  await role_permission.sync({ force: true });
  await user.sync({ force: true });
}

// init_company_contact();
// init_user_role_permission();

module.exports = { contact, company, permission, user_role , role_permission, user };
