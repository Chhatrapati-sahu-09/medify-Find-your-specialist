const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/Doctor");

exports.SignUpDoctor = async (req, res) => {
  // Doctor signup is now managed by Clinic accounts.
  // Clinics should create doctor subdocuments with POST /api/clinic/doctor
  return res.status(410).json({
    message:
      'Doctor self-signup is disabled. Clinics create doctor profiles via /api/clinic/doctor. If you need doctor-level logins, convert doctors to a separate collection and include password fields.'
  });
};


exports.SignInDoctor = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Since doctors are now subdocuments inside Clinic and do not have passwords,
    // doctor self-login is not supported. Clinics authenticate via /api/clinic/signin.
    // If doctor logins are required, migrate doctors to their own collection with password fields.
    return res.status(410).json({
      message:
        'Doctor login is disabled. Use clinic login (POST /api/clinic/signin) or migrate doctors to a separate collection to enable doctor-level authentication.'
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
// Doctor signup and signin removed. All doctor management is now via clinic endpoints.
