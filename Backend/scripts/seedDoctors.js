const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Doctor = require('../models/Doctor');

dotenv.config();

const doctors = [
  {
    fullName: 'Dr. Aarav Mehta',
    email: 'aarav.cardiology@example.com',
    password: 'Aarav@123',
    phone: '9876543201',
    clinicName: 'Heart Care Centre',
    clinicAddress: 'Sector 10, Bhilai',
    specialization: 'Cardiology',
    yearsOfExperience: 12,
    qualifications: 'MBBS, MD-Cardiology',
  },
  {
    fullName: 'Dr. Meera Kapoor',
    email: 'meera.derma@example.com',
    password: 'Meera@123',
    phone: '9876543202',
    clinicName: 'Skin Glow Clinic',
    clinicAddress: 'Civic Center, Bhilai',
    specialization: 'Dermatology',
    yearsOfExperience: 9,
    qualifications: 'MBBS, MD-Dermatology',
  },
  {
    fullName: 'Dr. Rohan Sinha',
    email: 'rohan.endo@example.com',
    password: 'Rohan@123',
    phone: '9876543203',
    clinicName: 'Endo Diabetes Clinic',
    clinicAddress: 'Smriti Nagar, Bhilai',
    specialization: 'Endocrinology',
    yearsOfExperience: 11,
    qualifications: 'MBBS, DM-Endocrinology',
  },
  {
    fullName: 'Dr. Kavita Sharma',
    email: 'kavita.gastro@example.com',
    password: 'Kavita@123',
    phone: '9876543204',
    clinicName: 'Gastro & Liver Care',
    clinicAddress: 'Supela, Bhilai',
    specialization: 'Gastroenterology',
    yearsOfExperience: 10,
    qualifications: 'MBBS, DM-Gastroenterology',
  },
  {
    fullName: 'Dr. Vikram Rao',
    email: 'vikram.neuro@example.com',
    password: 'Vikram@123',
    phone: '9876543205',
    clinicName: 'Brain & Spine Clinic',
    clinicAddress: 'Mohan Nagar, Durg',
    specialization: 'Neurology',
    yearsOfExperience: 14,
    qualifications: 'MBBS, DM-Neurology',
  },
  {
    fullName: 'Dr. Nisha Verma',
    email: 'nisha.onco@example.com',
    password: 'Nisha@123',
    phone: '9876543206',
    clinicName: 'Hope Cancer Centre',
    clinicAddress: 'Telibandha, Raipur',
    specialization: 'Oncology',
    yearsOfExperience: 13,
    qualifications: 'MBBS, MD, DM-Medical Oncology',
  },
  {
    fullName: 'Dr. Aditya Chauhan',
    email: 'aditya.ortho@example.com',
    password: 'Aditya@123',
    phone: '9876543207',
    clinicName: 'Bone & Joint Clinic',
    clinicAddress: 'Civil Lines, Raipur',
    specialization: 'Orthopedics',
    yearsOfExperience: 8,
    qualifications: 'MBBS, MS-Orthopedics',
  },
  {
    fullName: 'Dr. Riya Pandey',
    email: 'riya.pedia@example.com',
    password: 'Riya@123',
    phone: '9876543208',
    clinicName: 'Little Hearts Pediatric Clinic',
    clinicAddress: 'Rajendra Nagar, Bilaspur',
    specialization: 'Pediatrics',
    yearsOfExperience: 7,
    qualifications: 'MBBS, MD-Pediatrics',
  },
  {
    fullName: 'Dr. Harshit Joshi',
    email: 'harshit.psy@example.com',
    password: 'Harshit@123',
    phone: '9876543209',
    clinicName: 'Mind Wellness Centre',
    clinicAddress: 'Khamtarai, Rajnandgaon',
    specialization: 'Psychiatry',
    yearsOfExperience: 10,
    qualifications: 'MBBS, MD-Psychiatry',
  },
  {
    fullName: 'Dr. Sneha Tiwari',
    email: 'sneha.radio@example.com',
    password: 'Sneha@123',
    phone: '9876543210',
    clinicName: 'Advanced Imaging Centre',
    clinicAddress: 'Gol Bazar, Durg',
    specialization: 'Radiology',
    yearsOfExperience: 9,
    qualifications: 'MBBS, MD-Radiology',
  },
];

async function seed() {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI not set in environment. Aborting.');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding');

    for (const d of doctors) {
      const exists = await Doctor.findOne({ email: d.email });
      if (exists) {
        console.log(`Skipping existing doctor: ${d.email}`);
        continue;
      }

      const hashed = await bcrypt.hash(d.password, 10);
      const doc = new Doctor({
        name: d.fullName,
        email: d.email,
        password: hashed,
        phone: d.phone,
        clinicName: d.clinicName,
        clinicAddress: d.clinicAddress,
        specialization: d.specialization,
        experience: d.yearsOfExperience || 0,
        qualifications: d.qualifications,
      });

      await doc.save();
      console.log(`Inserted doctor: ${d.email}`);
    }

    console.log('Seeding complete');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error', err);
    process.exit(1);
  }
}

seed();
