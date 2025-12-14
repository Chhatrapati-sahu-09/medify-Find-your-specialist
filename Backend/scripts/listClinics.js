const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env') });
const connectDB = require('../config/db');
const Clinic = require('../models/Clinic');

async function list() {
  try {
    await connectDB();
    const clinics = await Clinic.find().lean();
    console.log(`Found ${clinics.length} clinics`);
    clinics.forEach(c => {
      console.log(`- ${c.clinicName} <${c.email}> id=${c._id}`);
    });
    process.exit(0);
  } catch (err) {
    console.error('Error listing clinics', err);
    process.exit(1);
  }
}

list();
