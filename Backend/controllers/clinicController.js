const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Clinic = require('../models/Clinic');

exports.SignUpClinic = async (req, res) => {
  const {
    clinicName,
    email,
    password,
    phone,
    clinicAddress,
    description,
    yearsOfService,
    infrastructure,
    servicesOffered,
    facilities,
    location,
    priceRange
  } = req.body;
  try {
    const existing = await Clinic.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Clinic already registered' });

    const hashed = await bcrypt.hash(password, 10);

    // Normalize arrays if sent as comma-separated strings
    const norm = (v) => {
      if (!v) return [];
      if (Array.isArray(v)) return v;
      if (typeof v === 'string') return v.split(',').map(s=>s.trim()).filter(Boolean);
      return [];
    };

    const clinic = new Clinic({
      clinicName,
      email,
      password: hashed,
      phone,
      clinicAddress,
      description,
      yearsOfService,
      infrastructure: norm(infrastructure),
      servicesOffered: norm(servicesOffered),
      facilities: norm(facilities),
      location: typeof location === 'object' ? location : (req.body.locationLat && req.body.locationLng ? { lat: Number(req.body.locationLat), lng: Number(req.body.locationLng) } : undefined),
      priceRange,
      banner: req.body.banner || req.body.profilePicture || undefined,
      profilePicture: req.body.profilePicture || req.body.banner || undefined,
      open: typeof req.body.open === 'boolean' ? req.body.open : (req.body.open === 'true'),
      distance: req.body.distance || undefined,
      doctors: [],
      reviews: []
    });
    await clinic.save();
    const safe = clinic.toObject();
    delete safe.password;
    res.status(201).json({ message: 'Clinic registered successfully', clinic: safe, clinicId: clinic._id });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.SignInClinic = async (req, res) => {
  const { email, password } = req.body;
  try {
    const clinic = await Clinic.findOne({ email });
    if (!clinic) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, clinic.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: clinic._id, role: 'clinic' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, clinicId: clinic._id });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.GetClinic = async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.user.id).select('-password');
    if (!clinic) return res.status(404).json({ message: 'Clinic not found' });
    res.json(clinic);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Public: get clinic by id
exports.GetClinicById = async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.id).select('-password');
    if (!clinic) return res.status(404).json({ message: 'Clinic not found' });
    res.json(clinic);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Doctor management (clinic authenticated)
exports.AddDoctor = async (req, res) => {
  try {
    const clinicId = req.user.id;
    const { name, specialization, experience, qualifications, consultationFee, profilePicture, workingHours, phone, email, active } = req.body;
    const clinic = await Clinic.findById(clinicId);
    if (!clinic) return res.status(404).json({ message: 'Clinic not found' });
    const doctor = { name, specialization, experience, qualifications, consultationFee, profilePicture, workingHours, phone, email, active };
    clinic.doctors.push(doctor);
    await clinic.save();
    const added = clinic.doctors[clinic.doctors.length - 1];
    res.status(201).json({ message: 'Doctor added', doctor: added });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.UpdateDoctor = async (req, res) => {
  try {
    const clinicId = req.user.id;
    const clinic = await Clinic.findById(clinicId);
    if (!clinic) return res.status(404).json({ message: 'Clinic not found' });
    const doc = clinic.doctors.id(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Doctor not found' });
    Object.assign(doc, req.body);
    await clinic.save();
    res.json({ message: 'Doctor updated', doctor: doc });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.DeleteDoctor = async (req, res) => {
  try {
    const clinicId = req.user.id;
    const clinic = await Clinic.findById(clinicId);
    if (!clinic) return res.status(404).json({ message: 'Clinic not found' });
    const doc = clinic.doctors.id(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Doctor not found' });
    doc.remove();
    await clinic.save();
    res.json({ message: 'Doctor removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Public: add a review to a clinic
exports.AddReview = async (req, res) => {
  try {
    const clinicId = req.params.id;
    const { name, rating, comment } = req.body;
    if (!name || !rating) return res.status(400).json({ message: 'Name and rating are required' });
    const clinic = await Clinic.findById(clinicId);
    if (!clinic) return res.status(404).json({ message: 'Clinic not found' });
    const rev = { name: name || 'Anonymous', rating: Number(rating) || 0, comment: comment || '' };
    clinic.reviews = clinic.reviews || [];
    clinic.reviews.unshift(rev);
    // update rating average
    const avg = clinic.reviews.reduce((s, r) => s + (r.rating || 0), 0) / clinic.reviews.length;
    clinic.rating = Number(avg.toFixed(1));
    await clinic.save();
    res.status(201).json({ message: 'Review added', review: rev, rating: clinic.rating });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
