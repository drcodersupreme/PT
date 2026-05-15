const express = require("express");
const { getProfile, login, register } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { validateLogin, validateRegister } = require("../middleware/validationMiddleware");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/profile", protect, getProfile);

module.exports = router;
