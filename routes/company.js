const express = require("express");
const router = express.Router();
const {
  index,
  createCompany,
  updateCompany,
  getCompanyDetail,
  deleteCompany,
  getCompanies,
} = require("../controllers/CompanyController");
const { isAuthenticated } = require("../controllers/AuthController");

async function guard(req, res, next) {
  if (isAuthenticated(req)) {
    next();
  } else {
    await res.redirect("/auth/login");
  }
}
// Get Contact List
router.get("/", guard, index);

router.get("/data", getCompanies);

router.get("/create", guard, createCompany);

router.post("/create", guard, createCompany);

router.get("/update/:id", guard, updateCompany);

router.post("/update/:id", guard, updateCompany);

router.get("/:id", guard, getCompanyDetail);

router.delete("/delete/:id", guard, deleteCompany);

module.exports = router;
