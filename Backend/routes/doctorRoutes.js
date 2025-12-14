const express = require("express");
const router = express.Router();
const Doctor = require('../models/Doctor');

// Public: list doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find().select('-appointments');
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Public: get doctor by id
router.get('/:id', async (req, res) => {
  try {
    const doc = await Doctor.findById(req.params.id).select('-appointments');
    if (!doc) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
