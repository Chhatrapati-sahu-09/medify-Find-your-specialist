import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AppointmentSuccess(){
  const { state } = useLocation();
  const navigate = useNavigate();
  const appointment = state?.appointment;

  if(!appointment) return (
    <div className="min-h-screen flex items-center justify-center">Missing appointment data.</div>
  );

  const addToCalendar = () => {
    // UI-only: could generate an .ics file; for now show alert
    alert('Add to calendar (UI-only)');
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6 text-center">
        <h2 className="text-2xl font-semibold mb-2">Your appointment is confirmed!</h2>
        <p className="text-gray-600 mb-4">A confirmation has been generated for your appointment.</p>

        <div className="text-left border rounded p-4 mb-4">
          <div className="mb-2"><strong>Doctor:</strong> {appointment.doctor?.name}</div>
          <div className="mb-2"><strong>Date:</strong> {appointment.date}</div>
          <div className="mb-2"><strong>Time:</strong> {appointment.slot}</div>
          <div className="mb-2"><strong>Clinic:</strong> {appointment.clinicName}</div>
          <div className="mb-2"><strong>Estimated Duration:</strong> {appointment.duration}</div>
        </div>

        <div className="flex gap-3 justify-center">
          <button onClick={addToCalendar} className="px-4 py-2 bg-white border rounded">Add to Calendar</button>
          <button onClick={()=>navigate('/')} className="px-4 py-2 bg-green-600 text-white rounded">Go Back Home</button>
        </div>
      </div>
    </div>
  );
}
