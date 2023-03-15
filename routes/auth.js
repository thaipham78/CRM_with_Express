const express = require("express");
const router = express.Router();
const {
  isAuthenticated,
  login,
  logout,
} = require("../controllers/AuthController");

// Get Contact List
router.get("/login", login);
router.post("/login", login);
router.get("/logout", logout);



module.exports = router;
