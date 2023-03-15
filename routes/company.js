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

// Get Contact List
router.get("/", index);

router.get("/data", getCompanies);

router.get("/create", createCompany);

router.post("/create", createCompany);

router.get("/update/:id", updateCompany);

router.post("/update/:id", updateCompany);

router.get("/:id", getCompanyDetail);

router.delete("/delete/:id", deleteCompany);

module.exports = router;
