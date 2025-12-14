import React from 'react';

export default function AppointmentSummaryCard({appointment}){
  if(!appointment) return null;
  const id = appointment.id || appointment.appointmentId || 'APPT' + Math.floor(Math.random()*90000+10000);
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h4 className="font-semibold mb-2">Appointment Summary</h4>
      <div className="text-sm text-gray-700 space-y-1">
        <div><strong>Appointment ID:</strong> {id}</div>
        <div><strong>Clinic:</strong> {appointment.clinicName}</div>
        <div><strong>Doctor:</strong> {appointment.doctor?.name}</div>
        <div><strong>Patient:</strong> {appointment.patientName}</div>
        <div><strong>Date & Time:</strong> {appointment.date} {appointment.slot}</div>
        <div><strong>Specialization:</strong> {appointment.doctor?.speciality}</div>
      </div>
    </div>
  );
}
