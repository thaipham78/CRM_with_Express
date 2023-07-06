const { user, user_role, permission } = require("../models/index.js");
const bcrypt = require("bcrypt");
const { logger } = require("../utils/logger.js");


function checkPermission(role) {
  if (role == "admin") {
    return true;
  } else {
    return false;
  }
}

async function index(req, res) {
  if (req.session.role && checkPermission(req.session.role)) {
    await res.render("user/user");
  } else {
    await res.redirect("/");
  }
}

async function getUsers(req, res, next) {
  try {
    if (req.session.role && checkPermission(req.session.role)) {
      let { offset, limit } = req.query;
      let users = await user.getUsers(offset, limit);

      let rows = users.rows;
      let total = users.total;

      let data = {
        total: total,
        rows: rows,
      };
      res.json(data);
    } else {
      res.redirect("/");
    }
  } catch (errors) {
    logger.log("error", errors);
    return next(errors);
  }
}

async function createUser(req, res, next) {
  try {
    if (req.session.role && checkPermission(req.session.role)) {
      let roles = await user_role.getRoles();
      let permissions = await permission.getPermissions();
      switch (req.method) {
        case "GET":
          res.render("User/createUser", {
            roles: roles,
            permissions: permissions,
          });
          break;
        case "POST":
          let {
            name,
            password,
            role,
            manage_users,
            manage_contacts,
            manage_companies,
          } = req.body;

          let permission_1 = null;
          let permission_2 = null;
          let permission_3 = null;

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

          let incoming_role = await user_role.findOne({
            where: { id: role },
          });

          let checkName = await user.getByName(name);

          if (checkName) {
            res.render("user/createUser", {
              nameExits: true,
              roles: roles,
              permissions: permissions,
            });
          } else {
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
            res.redirect("/user?add=1");
          }
          break;
        default:
          break;
      }
    } else {
      res.redirect("/");
    }
  } catch (errors) {
    logger.log("error", errors);
    return next(errors);
  }
}

async function getUserDetail(req, res, next) {
  try {
    if (req.session.role && checkPermission(req.session.role)) {
      let userData = await user.getUser(req.params.id);
      if (userData.queryUser.dataValues) {
        let { name } = userData.queryUser.dataValues;
        let { name: rName } = userData.relatedRole.dataValues;

        res.render("user/userDetail", {
          name: name,
          relatedRole: rName,
        });
      }
    } else {
      res.redirect("/");
    }
  } catch (errors) {
    logger.log("error", errors);
    return next(errors);
  }
}

async function deleteUser(req, res, next) {
  try {
    if (req.session.role && checkPermission(req.session.role)) {
      let reslt = await user.removeUser(req.params.id);
      res.redirect("/user");
    } else {
      res.redirect("/");
    }
  } catch (errors) {
    logger.log("error", errors);
    return next(errors);
  }
}

module.exports = {
  createUser,
  getUserDetail,
  deleteUser,
  index,
  getUsers,
};
