const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Clinic = require('../models/Clinic');
const Patient = require('../models/Patient');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '') || req.header('token');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

// Book appointment
router.post('/book', verifyToken, async (req, res) => {
  try {
    const {
      clinicId,
      doctorName,
      doctorSpecialization,
      appointmentDate,
      appointmentTime,
      reason,
      notes
    } = req.body;

    // Get patient details from token
    const patient = await Patient.findById(req.user.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Get clinic details
    const clinic = await Clinic.findById(clinicId);
    if (!clinic) {
      return res.status(404).json({ message: 'Clinic not found' });
    }

    // Create appointment
    const appointment = new Appointment({
      patientId: patient._id,
      patientName: patient.name,
      patientEmail: patient.email,
      patientPhone: patient.phone,
      clinicId: clinic._id,
      clinicName: clinic.clinicName,
      doctorName,
      doctorSpecialization,
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      reason: reason || 'General consultation',
      notes,
      status: 'confirmed' // Auto-confirm for now
    });

    await appointment.save();

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment
    });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get appointments for a clinic (for clinic dashboard)
router.get('/clinic/:clinicId', verifyToken, async (req, res) => {
  try {
    const { clinicId } = req.params;

    // Verify that the clinic is accessing its own appointments
    if (req.user.id !== clinicId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const appointments = await Appointment.find({ clinicId })
      .sort({ appointmentDate: 1, appointmentTime: 1 });

    res.json(appointments);
  } catch (error) {
    console.error('Error fetching clinic appointments:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get appointments for a patient
router.get('/patient/:patientId', verifyToken, async (req, res) => {
  try {
    const { patientId } = req.params;

    // Verify that the patient is accessing their own appointments
    if (req.user.id !== patientId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const appointments = await Appointment.find({ patientId })
      .sort({ appointmentDate: 1, appointmentTime: 1 })
      .populate('clinicId', 'clinicName clinicAddress')
      .populate('patientId', 'name email phone');

    res.json(appointments);
  } catch (error) {
    console.error('Error fetching patient appointments:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update appointment status
router.put('/:id/status', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check if clinic owns this appointment
    if (appointment.clinicId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    appointment.status = status;
    await appointment.save();

    res.json({
      message: 'Appointment status updated successfully',
      appointment
    });
  } catch (error) {
    console.error('Error updating appointment status:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete appointment
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check if user owns this appointment (patient) or clinic owns it
    const isPatientOwner = appointment.patientId.toString() === req.user.id;
    const isClinicOwner = appointment.clinicId.toString() === req.user.id;

    if (!isPatientOwner && !isClinicOwner && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Appointment.findByIdAndDelete(id);

    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;