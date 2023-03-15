// const {contact,company} =require("../models/index.js");
const { isAuthenticated } = require("./AuthController.js");

async function index(req, res) {
  if (isAuthenticated(req)) {
    await res.render("index");
  }
  else{
    await res.redirect("auth/login")
  }
}

module.exports = { index };
