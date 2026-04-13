const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const verifyToken = require("../middleware/auth");

// REGISTER
router.post("/register", authController.register);

// LOGIN
router.post("/login", authController.login);

// FORGOT PASSWORD
router.post("/forgot-password", authController.forgotPassword);

// RESET PASSWORD
router.post("/reset-password", authController.resetPassword);

// GET USER
router.get("/me", verifyToken, authController.getMe);

module.exports = router;