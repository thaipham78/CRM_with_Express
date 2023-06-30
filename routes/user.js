const express = require("express");
const router = express.Router();
const {
  createUser,
  getUserDetail,
  deleteUser,
  index,
  getUsers,
} = require("../controllers/UserController");
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

router.get("/data", getUsers);

router.get("/create", guard, createUser);

router.post("/create", guard, createUser);

router.get("/:id", guard, getUserDetail);

router.delete("/delete/:id", guard, deleteUser);

module.exports = router;
