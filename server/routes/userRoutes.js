const {
  register,
  login,
  setAvatar,
  getAllUsers,
} = require("../controllers/usersController");
const express = require("express");
const router = express.Router(); // Use express.Router() directly

// Route for user registration
router.post("/register", register);

// Route for user login
router.post("/login", login);

// Route for setting user avatar
router.post("/setAvatar/:id", setAvatar);

// Route for getting all users, should be a GET request
router.get("/allusers/:id", getAllUsers);

module.exports = router;
