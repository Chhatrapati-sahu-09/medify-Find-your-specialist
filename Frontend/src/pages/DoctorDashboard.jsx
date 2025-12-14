import React from 'react';
import DashboardHeader from '../components/DashboardHeader';
import AppointmentCard from '../components/AppointmentCard';
import AppointmentTable from '../components/AppointmentTable';

const todayAppointments = [
  {
    _id: 'D200',
    patientName: 'Rohit Singh',
    specialization: 'Skin Rash',
    clinicName: 'SkinGlow Bhilai',
    date: '2025-12-08',
    time: '09:30 AM',
    status: 'confirmed',
  },
  {
    _id: 'D201',
    patientName: 'Neha Kumar',
    specialization: 'Acne',
    clinicName: 'SkinGlow Bhilai',
    date: '2025-12-08',
    time: '10:00 AM',
    status: 'confirmed',
  },
];

const weekly = [
  { _id: 'W1', date: '2025-12-08', patientName: 'Rohit Singh', time: '09:30 AM', status: 'confirmed' },
  { _id: 'W2', date: '2025-12-09', patientName: 'Asha Patel', time: '11:00 AM', status: 'cancelled' },
  { _id: 'W3', date: '2025-12-11', patientName: 'Neha Kumar', time: '10:00 AM', status: 'confirmed' },
];

export default function DoctorDashboard() {
  const doctorName = 'Dr. Meera Sahu';

  const handleMarkCompleted = (a) => alert('Mark completed: ' + a._id);
  const handleViewPatient = (a) => alert('View patient: ' + a._id);

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-6xl mx-auto p-6">
        <DashboardHeader title={`Welcome, ${doctorName}`} subtitle={"Today's schedule and upcoming appointments"} />

        <section className="mb-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-3">Today's Appointments</h2>
          <div className="space-y-3">
            {todayAppointments.map((a) => (
              <AppointmentCard
                key={a._id}
                appointment={a}
                onView={handleViewPatient}
                primaryAction={{ label: 'Mark Completed', call: handleMarkCompleted }}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-3">Weekly Appointments</h2>
          <AppointmentTable
            appointments={weekly.map(w => ({ _id: w._id, patientName: w.patientName, date: w.date, time: w.time, status: w.status }))}
            actionsRender={(a) => (
              <button onClick={() => handleMarkCompleted(a)} className="px-3 py-1 bg-white border rounded text-sm">Mark Completed</button>
            )}
          />
        </section>
      </div>
    </div>
  );
}
