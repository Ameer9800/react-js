const express = require("express");
const {
  register_user,
  login_user,
  allUsers,
  upload,
} = require("../controller/userController");
const router = express.Router();

router.post("/register", upload, register_user);

router.post("/login", login_user);

router.get("/all", allUsers);

module.exports = router;
