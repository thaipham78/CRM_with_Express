const express = require("express");
const router = express.Router();
const {index} = require("../controllers/HomeController");
// Get Contact List
router.get("/", index);

module.exports=router;