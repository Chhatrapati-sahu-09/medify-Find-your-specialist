require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const Clinic = require('./models/Clinic');

async function checkClinics() {
  try {
    console.log('MONGO_URI:', process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    const count = await Clinic.countDocuments();
    console.log('Total clinics in database:', count);

    if (count > 0) {
      const clinic = await Clinic.findOne({}, 'clinicName email');
      console.log('Sample clinic:', clinic.clinicName, clinic.email);
    }

    await mongoose.disconnect();
  } catch (err) {
    console.error('Database error:', err.message);
  }
}
checkClinics();