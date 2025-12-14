const express = require("express");
const router = express.Router();
const { SignUpPatient, SignInPatient } = require("../controllers/patientController");
const authMiddleware = require("../middleware/authMiddleware");
const patientMiddleware = require("../middleware/patientMiddleware");

// Auth
router.post("/signup", SignUpPatient);
router.post("/signin", SignInPatient);

// Protected
router.get("/dashboard", authMiddleware, patientMiddleware, (req, res) => {
  res.json({ message: "Welcome Patient", patientId: req.user.id });
});

module.exports = router;
