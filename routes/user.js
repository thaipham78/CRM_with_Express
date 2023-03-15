const express = require("express");
const router = express.Router();
const {
  createUser,
  getUserDetail,
  deleteUser,
  index,
  getUsers,
} = require("../controllers/UserController");

// Get Contact List
router.get("/", index);

router.get("/data", getUsers);

router.get("/create", createUser);

router.post("/create", createUser);

router.get("/:id", getUserDetail);

router.delete("/delete/:id", deleteUser);

module.exports = router;
