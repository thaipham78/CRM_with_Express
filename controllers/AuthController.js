const { user } = require("../models/index.js");
const bcrypt = require("bcrypt");
const { logger } = require("../utils/logger.js");

function isAuthenticated(req) {
  if (req.session.user) return true;
  else return false;
}

async function login(req, res, next) {
  switch (req.method) {
    case "GET":
      res.render("login");
      break;
    case "POST":
      try {
        let userData = null;
        let extractedUserData = null;
        let relatedRole = null;
        let match = null;
        if (req.body.name && req.body.password) {
          userData = await user.getByName(req.body.name);
          extractedUserData = userData.queryUser.dataValues;
          relatedRole = userData.relatedRole.dataValues;
          match = await bcrypt.compare(
            req.body.password,
            extractedUserData.password
          );
          if (match) {
            req.session.regenerate(function (err) {
              if (err) next(err);

              // store user information in session, typically a user id
              req.session.user = extractedUserData.id;
              req.session.userName = req.body.name;
              req.session.role = relatedRole.name;
              // save the session before redirection to ensure page
              // load does not happen before session is saved
              req.session.save(function (err) {
                if (err) return next(err);
                res.redirect("/");
              });
            });
          } else {
            res.redirect("/auth/login");
          }
        } else {
          res.redirect("/auth/login");
        }
        break;
      } catch (errors) {
        logger.log("error", errors);
        return next(errors);
      }
  }

  // login logic to validate req.body.user and req.body.pass
  // would be implemented here. for this example any combo works

  // regenerate the session, which is good practice to help
  // guard against forms of session fixation
}

function logout(req, res) {
  try {
    // logout logic
    // clear the user from the session object and save.
    // this will ensure that re-using the old session id
    // does not have a logged in user
    req.session.user = null;
    req.session.save(function (err) {
      if (err) next(err);

      // regenerate the session, which is good practice to help
      // guard against forms of session fixation
      req.session.regenerate(function (err) {
        if (err) next(err);
        res.redirect("/");
      });
    });
  } catch (errors) {
    logger.log("error", errors);
    return next(errors);
  }
}

module.exports = { isAuthenticated, login, logout };
