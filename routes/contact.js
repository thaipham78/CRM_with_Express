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

// Get Contact List
router.get("/", index);

router.get("/data", getContacts);

router.get("/create", createContact);

router.post("/create", createContact);

router.get("/update/:id", updateContact);

router.post("/update/:id", updateContact);

router.get("/:id", getContactDetail);

router.delete("/delete/:id", deleteContact);

module.exports = router;
