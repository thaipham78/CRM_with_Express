const { contact, company } = require("../models/index.js");
const { logger } = require("../utils/logger.js");

async function index(req, res, next) {
  try {
    await res.render("contact/contact");
  } catch (errors) {
    logger.log("error", errors);
    return next(errors);
  }
}

async function getContacts(req, res, next) {
  try {
    let { offset, limit } = req.query;
    let contacts = await contact.getContacts(offset, limit);

    let rows = contacts.rows;
    let total = contacts.total;

    let data = {
      total: total,
      rows: rows,
    };
    res.json(data);
  } catch (errors) {
    logger.log("error", errors);
    return next(errors);
  }
}

async function createContact(req, res, next) {
  switch (req.method) {
    case "GET":
      try {
        let companies = await company.getCompanies(0, 5);
        let rows = companies.rows;
        await res.render("Contact/createContact", { companyList: rows });
      } catch (errors) {
        logger.log("error", errors);
        return next(errors);
      }
      break;

    case "POST":
      try {
        let companies = await company.getCompanies(0, 5);
        let rows = companies.rows;
        let { name, phone, email, companyName } = req.body;
        const inputCompany = await company.findOne({
          where: { id: companyName },
        });

        let checkName = await contact.getContactByName(name);

        if (checkName) {
          res.render("contact/createContact", {
            nameExits: true,
            companyList: rows,
          });
        } else {
          await contact.addContact(
            {
              name: name,
              email: email,
              phone: phone,
              createdAt: Date.now(),
              updatedAt: Date.now(),
            },
            inputCompany
          );

          res.redirect("/contact");
        }
      } catch (errors) {
        logger.log("error", errors);
        return next(errors);
      }

      break;
    default:
      break;
  }
}

async function updateContact(req, res, next) {
  switch (req.method) {
    case "GET":
      try {
        let contactData = await contact.getContact(req.params.id);
        let companies = await company.getCompanies(0, 10);
        let rows = companies.rows;
        if (contactData) {
          let { name, phone, email } = contactData.queryContact.dataValues;
          let { id, name: cName } = contactData.relatedCompany.dataValues;

          res.render("contact/updateContact", {
            name: name,
            phone: phone,
            mail: email,
            companyList: rows,
            selectedCompany: { companyId: id, companyName: cName },
          });
        }
      } catch (errors) {
        logger.log("error", errors);
        return next(errors);
      }

      break;
    case "POST":
      try {
        let { name, phone, email, companyName, companyId } = req.body;
        let updateCompany = null;
        if (companyId != companyName) {
          updateCompany = await company.findOne({
            where: { id: companyName },
          });
        }

        contact.updateContact(
          {
            name: name,
            email: email,
            phone: phone,
            updatedAt: Date.now(),
          },
          req.params.id,
          updateCompany
        );

        res.redirect("/contact");
      } catch (errors) {
        logger.log("error", errors);
        return next(errors);
      }
      break;
    default:
      break;
  }
}

async function getContactDetail(req, res, next) {
  try {
    let contactData = await contact.getContact(req.params.id);
    if (contactData) {
      let { name, phone, email, id: cId } = contactData.queryContact.dataValues;
      let { id, name: cName } = contactData.relatedCompany.dataValues;
      let url = "http://localhost:3000/contact/update/" + cId.toString();
      res.render("contact/contactDetail", {
        name: name,
        phone: phone,
        mail: email,
        uri: url,
        relatedComapany: cName,
      });
    }
  } catch (errors) {
    logger.log("error", errors);
    return next(errors);
  }
}

async function deleteContact(req, res, next) {
  try{
    await contact.removeContact(req.params.id);
    res.redirect("/contact");
  }
  catch(errors){
    logger.log("error", errors);
    return next(errors);
  }
}

module.exports = {
  createContact,
  updateContact,
  getContactDetail,
  deleteContact,
  index,
  getContacts,
};
