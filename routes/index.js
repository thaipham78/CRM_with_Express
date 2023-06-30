const express = require("express");
const router = express.Router();
const {index} = require("../controllers/HomeController");
// Get Contact List

const { isAuthenticated } = require("../controllers/AuthController");

async function guard(req, res, next) {
  if (isAuthenticated(req)) {
    next();
  } else {
    await res.redirect("/auth/login");
  }
}
router.get("/",guard, index);

module.exports=router;