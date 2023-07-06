const { company } = require("../models/index.js");
const { logger } = require("../utils/logger.js");
const { isAuthenticated } = require("./AuthController.js");

async function guard(req, res, next) {
  if (isAuthenticated(req)) {
    next();
  } else {
    await res.redirect("auth/login");
  }
}

async function index(req, res, next) {
  try {
    await res.render("company/company");
  } catch (errors) {
    logger.log("error", errors);
    return next(errors);
  }
}

async function getCompanies(req, res, next) {
  try {
    let { offset, limit } = req.query;
    let companies = await company.getCompanies(offset, limit);
    let rows = companies.rows;
    let total = companies.total;
    let data = {
      total: total,
      rows: rows,
    };
    res.json(data);
  } catch (err) {
    logger.log("error", err);
    return next(err);
  }
}

async function createCompany(req, res, next) {
  switch (req.method) {
    case "GET":
      try {
        await res.render("company/createCompany");
      } catch (errors) {
        logger.log("error", errors);
        return next(errors);
      }
      break;
    case "POST":
      try {
        let { name, phone, email } = req.body;

        let checkName = await company.getCompanyByName(name);

        if (checkName) {
          res.render("company/createCompany", { nameExits: true });
        } else {
          await company.addCompany({
            name: name,
            email: email,
            phone: phone,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          });

          res.redirect("/company?add=1");
        }
      } catch (err) {
        logger.error(err);
        return next(err);
      }

      break;
    default:
      break;
  }
}

async function updateCompany(req, res, next) {
  switch (req.method) {
    case "GET":
      try {
        let companyData = await company.getCompany(req.params.id);
        if (companyData.dataValues) {
          let { name, phone, email } = companyData.dataValues;
          res.render("company/updateCompany", {
            name: name,
            phone: phone,
            mail: email,
          });
        }
      } catch (err) {
        logger.log("error", err);
        return next(err);
      }

      break;
    case "POST":
      try {
        let { name, phone, email } = req.body;

        company.updateCompany(
          {
            name: name,
            email: email,
            phone: phone,
            updatedAt: Date.now(),
          },
          req.params.id
        );

        res.redirect("/company?update=1");
      } catch (err) {
        logger.log("error", err);
        return next(err);
      }
      break;
    default:
      break;
  }
}

async function getCompanyDetail(req, res, next) {
  try {
    let companyData = await company.getCompany(req.params.id);
    if (companyData.dataValues) {
      let { id, name, phone, email } = companyData.dataValues;
      let url = "http://localhost:3000/company/update/" + id.toString();
      res.render("company/companyDetail", {
        name: name,
        phone: phone,
        mail: email,
        uri: url,
      });
    }
  } catch (errors) {
    logger.log("error", errors);
    return next(errors);
  }
}

async function deleteCompany(req, res) {
  try {
     await company.removeCompany(req.params.id);
    res.json("1");
  } catch (errors) {
    logger.log("error", errors);
    return next(errors);
  }
}

module.exports = {
  createCompany,
  updateCompany,
  getCompanyDetail,
  deleteCompany,
  index,
  getCompanies,
};
