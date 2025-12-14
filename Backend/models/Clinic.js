const mongoose = require('mongoose');

const doctorSubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  specialization: { type: String },
  experience: { type: String },
  qualifications: { type: String },
  consultationFee: { type: Number },
  workingHours: { type: String },
  profilePicture: { type: String },
  createdAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
});

const reviewSchema = new mongoose.Schema({
  patientName: String,
  name: String,
  rating: Number,
  comment: String,
  date: { type: Date, default: Date.now }
});

const clinicSchema = new mongoose.Schema({
  clinicName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  clinicAddress: String,
  description: String,
  yearsOfService: Number,
  infrastructure: [String],
  servicesOffered: [String],
  facilities: [String],
  location: {
    lat: Number,
    lng: Number
  },
  banner: String,
  profilePicture: String,
  rating: { type: Number, default: 0 },
  open: { type: Boolean, default: true },
  distance: String,
  priceRange: String,
  reviews: [reviewSchema],
  doctors: [doctorSubSchema],
  role: { type: String, default: 'clinic' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Clinic', clinicSchema);
