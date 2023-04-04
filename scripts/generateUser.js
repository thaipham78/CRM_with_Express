const { user, user_role, permission } = require("../models/index");
const bcrypt = require("bcrypt");


async function generateUser(){
let name = "crmuser78";
let password = "741852963@Vn";
let role = 1;
let manage_contacts = "manage contacts";
let manage_companies = " manage companies";
let manage_users = "manage users";

let permission_1 = null;
let permission_2 = null;
let permission_3 = null;

let incoming_role = await user_role.findOne({
  where: { id: role },
});

if (manage_users) {
  permission_1 = await permission.findOne({
    where: { name: manage_users },
  });
}
if (manage_contacts) {
  permission_2 = await permission.findOne({
    where: { name: manage_contacts },
  });
}
if (manage_companies) {
  permission_3 = await permission.findOne({
    where: { name: manage_companies },
  });
}

const saltRounds = parseInt(process.env.SESSIONSECRET);
let hashedPass = await bcrypt.hash(password, saltRounds);

await user.addUser(
  {
    name: name,
    password: hashedPass,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  incoming_role,
  [permission_1, permission_2, permission_3]
);

console.log("Create User Successfully");
}

generateUser();