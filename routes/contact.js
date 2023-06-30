const express = require("express");
const router = express.Router();
const {
  createContact,
  updateContact,
  getContactDetail,
  deleteContact,
  index,
  getContacts,
} = require("../controllers/ContactController");
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

router.get("/data", getContacts);

router.get("/create", guard, createContact);

router.post("/create", guard, createContact);

router.get("/update/:id", guard, updateContact);

router.post("/update/:id", guard, updateContact);

router.get("/:id", guard, getContactDetail);

router.delete("/delete/:id", guard, deleteContact);

module.exports = router;
