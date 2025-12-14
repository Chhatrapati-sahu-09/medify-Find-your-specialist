const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Patient = require("../models/Patient");

exports.SignUpPatient = async (req, res) => {
  const { name, age, gender, phone, email, password } = req.body;

  try {
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: "Patient already registered" });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const newPatient = new Patient({
      name,
      age,
      gender,
      phone,
      email,
      password: hashedPassword,
      role: "patient",
    });

    await newPatient.save();

    res.status(201).json({ message: "Patient registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.SignInPatient = async (req, res) => {
  const { email, password } = req.body;



  try {
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    
    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: patient._id, role: patient.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, patientId: patient._id });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
