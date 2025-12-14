const express = require('express');
const router = express.Router();
const Clinic = require('../models/Clinic');

// GET /api/search?speciality=&location=&minFee=&maxFee=&sortBy=&limit=
router.get('/', async (req, res) => {
  try {
    const { speciality, location, minFee, maxFee, sortBy, limit } = req.query;

    // Build aggregation pipeline
    const pipeline = [];

    // Match clinics by location if provided
    if (location) {
      // match clinics whose address contains the location string
      pipeline.push({
        $match: {
          clinicAddress: { $regex: location, $options: 'i' }
        }
      });
    }

    // Project matched doctors
    const doctorCond = [];
    if (speciality) {
      doctorCond.push({ $regexMatch: { input: '$$doc.specialization', regex: speciality, options: 'i' } });
    }
    if (minFee) {
      doctorCond.push({ $gte: ['$$doc.consultationFee', Number(minFee)] });
    }
    if (maxFee) {
      doctorCond.push({ $lte: ['$$doc.consultationFee', Number(maxFee)] });
    }

    let matchExpr = {};
    if (doctorCond.length) {
      matchExpr = { $expr: { $and: doctorCond } };
    }

    // Add matchedDoctors field using $filter
    if (doctorCond.length) {
      pipeline.push({
        $addFields: {
          matchedDoctors: {
            $filter: {
              input: '$doctors',
              as: 'doc',
              cond: { $and: doctorCond.map((c) => c) }
            }
          }
        }
      });
      // only return clinics with matched doctors
      pipeline.push({ $match: { 'matchedDoctors.0': { $exists: true } } });
    } else {
      // no doctor filtering -> include all doctors as matchedDoctors
      pipeline.push({ $addFields: { matchedDoctors: '$doctors' } });
    }

    // Sorting
    if (sortBy === 'rating') {
      pipeline.push({ $sort: { 'rating': -1 } });
    }

    if (limit) pipeline.push({ $limit: Number(limit) });

    // Final projection
    pipeline.push({
      $project: {
        password: 0,
        doctors: 0 // hide original doctors array, present matchedDoctors instead
      }
    });

    const results = await Clinic.aggregate(pipeline).exec();
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
