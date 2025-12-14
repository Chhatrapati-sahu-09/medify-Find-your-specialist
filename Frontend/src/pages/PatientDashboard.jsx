import React from 'react';
import DashboardHeader from '../components/DashboardHeader';
import AppointmentCard from '../components/AppointmentCard';

const sampleUpcoming = [
  {
    _id: 'A1234',
    patientName: 'Rohan Patel',
    doctorName: 'Dr. Meera Sahu',
    specialization: 'Dermatology',
    clinicName: 'SkinGlow Bhilai',
    clinicAddress: 'Sector 9, Bhilai',
    date: '2025-12-20',
    time: '11:30 AM',
    status: 'confirmed',
  },
];

export default function PatientDashboard() {
  const patientName = 'Rohan Patel';

  const handleView = (appt) => alert('View details: ' + appt._id);

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-6xl mx-auto p-6">
        <DashboardHeader title={`Welcome, ${patientName}`} subtitle={'Here are your appointments'} />

        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-3">Upcoming Appointments</h2>
          <div className="space-y-3">
            {sampleUpcoming.map((a) => (
              <AppointmentCard key={a._id} appointment={a} onView={handleView} primaryAction={{ label: 'Join', call: null }} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
