const express = require("express");
const router = express.Router();
const {
  registerUser,
  logInUser,
  getUser,
  logout,
  getNewAccessToken,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddlewar");

router.post("/create", registerUser);

router.post("/login", logInUser);
router.delete("/logout", logout);
router.get("/refresh", getNewAccessToken);
router.get("/info", protect, getUser);

module.exports = router;
